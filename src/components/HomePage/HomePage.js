import React, {useContext, useState, useEffect} from 'react';

import './HomePage.css';
import HomePageSlide from "../HomePageSlide/HomePageSlide";
import Restaurants from "../Restaurants/Restaurants";
import HomeHeader from "../HomeHeader/HomeHeader";
import RestaurantMenu from "../RestaurantMenu/RestaurantMenu";
import axios from "axios";
import Partners from "../../context";


const HomePage = (props) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [chosenRestaurant, setChosenRestaurant] = useState([]);
    const [restaurantMenu, setRestaurantMenu] = useState([]);
    const [searchedDish, setSearchedDish] = useState('');

    const data = useContext(Partners);
    const restaurantLinks = data.map(partner => partner.products);

    const toggleRestaurantMenu = () => {
        return displayMenu
            ? setDisplayMenu(!displayMenu)
            : null
    };

    const fetchData = async (url) => {
        const response = await axios.get(url);
        if (response.status !== 200) {
            throw new Error(`Ошибка по адресу: ${url}, статус ошибки ${response.status}!`)
        }
        return response.data
    };

    const openRestaurantMenu = async (event, product, restaurant) => {
        event.preventDefault();
        if (!product.trim()) {
            return;
        }
        if (props.userName) {
            setDisplayMenu(true);
        } else {
            props.toggleModalAuth()
        }
        if (!restaurant) {
            let filteredMenu = [];
            restaurantLinks.forEach(link => {
                fetchData(`./db/${link}`)
                    .then(data => {
                        data.filter(item => {
                            if (item.name.toLowerCase().includes(product.toLowerCase())) {
                                filteredMenu.push(item)
                            }
                            return setRestaurantMenu( [...filteredMenu])
                        });
                    })
            });
            setChosenRestaurant([]);
            setSearchedDish(product)
        } else {
            fetchData(`./db/${product}`)
                .then(result => setRestaurantMenu(result));
            setChosenRestaurant([restaurant])
        }
    };

    useEffect(() => {
        setRestaurantMenu(restaurantMenu);
        setChosenRestaurant(chosenRestaurant)
    }, [setRestaurantMenu, setChosenRestaurant]);


    return (
        <section className="container">

            <HomeHeader
                userName={props.userName}
                logOut={props.logOut}
                toggleModalAuth={props.toggleModalAuth}
                toggleModalCart={props.toggleModalCart}
                toggleRestaurantMenu={toggleRestaurantMenu}
            />


            <section className='main'>
                <div className='container'>
                    {!displayMenu ?
                        <>
                            <HomePageSlide />
                            <section className="restaurants">
                                <div className="section-heading">
                                    <h2 className="section-title">Рестораны</h2>
                                    <label className="search">
                                        <input type="text"
                                               className="input input-search"
                                               placeholder="Поиск блюд и ресторанов"
                                               onKeyPress={event => {
                                                   if (event.charCode === 13) {
                                                       openRestaurantMenu(event, event.target.value)
                                                   }
                                               }}

                                        />
                                    </label>
                                </div>
                                <Restaurants restaurants={data} openMenu={openRestaurantMenu} />
                            </section>
                        </>
                        : <RestaurantMenu
                            restaurantMenu={restaurantMenu}
                            chosenRestaurant={chosenRestaurant}
                            searchedDish={searchedDish}
                            toggleModalCart={props.toggleModalCart}
                            addFood={props.addFood}
                        />

                    }
                </div>
            </section>
            {props.children}
        </section>
    )
};

export default HomePage;