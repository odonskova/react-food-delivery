import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route } from "react-router-dom";


import HomePage from "../src/components/HomePage/HomePage";
import ModalAuth from "../src/components/ModalAuth/ModalAuth";
import {disableScroll, enableScroll} from "../src/disableScroll";
import FooterNavbar from "../src/components/Footer/FooterNavbar";
import ModalCart from "./components/ModalCart/ModalCart";

const App = () => {
    const [modalAuth, setModalAuth] = useState(false);
    const [modalCart, setModalCart] = useState(false);
    const [userName, setUserName] = useState('');
    const [cart, setCart] = useState([]);

    const localStorageData = localStorage.getItem('deliveryFood');

    useEffect(() => {
        if (modalAuth || modalCart) {
            disableScroll()
        } else {
            enableScroll()
        }
    }, [modalAuth, modalCart]);

    useEffect(() => {
        localStorageData ? setUserName(localStorageData) : setUserName('');
    }, [localStorageData]);

    useEffect(() => {
        setCart(cart);
    }, [setCart]);

    const toggleModalAuth = () => {
        setModalAuth(!modalAuth);
    };

    const toggleModalCart = () => {
        setModalCart(!modalCart);
    };

    const logIn = (value) => {
        localStorage.setItem('deliveryFood', value);
    };

    const logOut = () => {
        localStorage.removeItem('deliveryFood');
        setUserName('')
    };

    const addFoodToCart = (event, id, name, cost) => {
        const food = cart.find((item) => {
            return item.id === id
        });
        if (food) {
            food.count += 1
        } else {
            setCart(prev => [...prev, {id, title: name, cost, count: 1}]);
        }
    };

    return (
        <BrowserRouter>
                <Route exect to="/" >
                    <HomePage
                        userName={userName}
                        toggleModalAuth={toggleModalAuth}
                        toggleModalCart={toggleModalCart}
                        addFood={addFoodToCart}
                        logOut={logOut}
                    >
                        {modalCart ? <ModalCart
                            cart={cart}
                            closeCart={toggleModalCart}
                        /> : null}

                        {modalAuth ? <ModalAuth
                            modalAuth={modalAuth}
                            closeModal={toggleModalAuth}
                            logIn={logIn}
                        /> : null}

                    </HomePage>
                </Route>
                <FooterNavbar/>
        </BrowserRouter>
    )
};

export default App