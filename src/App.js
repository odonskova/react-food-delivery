import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import HomePage from "../src/components/HomePage/HomePage";
import ModalProposal from "./components/Modals/ModalProposal/ModalProposal";
import ModalAuth from "./components/Modals/ModalAuth/ModalAuth";
import ModalCart from "./components/Modals/ModalCart/ModalCart";
import ModalRegistry from "./components/Modals/ModalRegistry/ModalRegistry";
import {scrollFunctions, enableScroll} from "./scrollFunctions";

const getCartInfo = () => {
    const usersData = JSON.parse(localStorage.getItem("DeliveryFoodData"));
    const currentUser = localStorage.getItem('CurrentUser');
    let cart = [];
    if (currentUser) {
        let user = usersData.filter(item => item.user === currentUser);
        cart = user.map(item => {
            if (item.cart) {
               return item.cart.map(data => cart.push(data))
            } else {
                return cart
            }
        })
    }
};

const App = () => {
    const currentUser = localStorage.getItem('CurrentUser');
    const [modalAuth, setModalAuth] = useState(false);
    const [modalCart, setModalCart] = useState(false);
    const [modalRegistry, setModalRegistry] = useState(false);
    const [modalProposal, setModalProposal] = useState(true);
    const [userName, setUserName] = useState("");
    const [cart, setCart] = useState(getCartInfo() || []);

    useEffect(() => {
        if (modalAuth || modalCart || modalRegistry) {
            scrollFunctions()
        } else {
            enableScroll()
        }
    }, [modalAuth, modalCart, modalRegistry]);

    useEffect(() => {
        currentUser ? setUserName(currentUser) : setUserName('');
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser) {
            setCart([])
        } else {
            setCart(currentUser.cart)
        }
    }, []);


    const toggleModalAuth = () => {
        setModalAuth(!modalAuth);
    };

    const toggleModalCart = () => {
        setModalCart(!modalCart);
    };

    const toggleModalRegistry = () => {
        setModalProposal(false);
        setModalAuth(false);
        setModalRegistry(!modalRegistry);
    };

    const closeModal = () => {
        setModalProposal(false);
    };

    const logOut = () => {
        localStorage.removeItem('CurrentUser');
        setUserName('')
    };

    const saveOrder = (order) => {
        if (!userName) {
            let anonymous = {
                cart: []
            };
            anonymous.cart = [...cart, order];
            localStorage.setItem("CurrentUserData", JSON.stringify(anonymous));
        } else {
            let currentUserData = JSON.parse(localStorage.getItem("CurrentUserData"));
            currentUserData.cart.push(order);
            localStorage.setItem("CurrentUserData", JSON.stringify(currentUserData));

            let usersData = JSON.parse(localStorage.getItem("DeliveryFoodData"));
            let filteredUsersArr = usersData.filter(item => item.user !== currentUser);

            let data = filteredUsersArr.concat(currentUserData);
            localStorage.setItem("DeliveryFoodData", JSON.stringify(data))
        }
    };

    const addFoodToCart = (id, name, cost) => {
        const food = cart.find(item => {
            return item.id === id
        });
        if (food) {
            food.count += 1
        } else {
            setCart(prev => [...prev, {id, title: name, cost, count: 1}]);
            saveOrder({id, title: name, cost, count: 1});
        }
        // const addFoodToCart = (id, name, cost) => {
        //     const food = cart.find(item => {
        //         return item.id === id
        //     });
        //     if (food) {
        //         food.count += 1;
        //         const filteredCartData = cart.filter(order => order.id !== food.id);
        //         const newFoodCount = {id, title: name, cost, count: food.count};
        //         const newCartData = filteredCartData.concat(new Array(newFoodCount));
        //         setCart(newCartData);
        //         saveOrder(cart);
        //     } else {
        //         let newCartData = [{id, title: name, cost, count: 1}];
        //         setCart(newCartData);
        //         saveOrder(cart);
        //     }

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
                    { modalProposal && !userName ? <ModalProposal
                        openRegistryForm={toggleModalRegistry}
                        closeModal={closeModal}
                    /> : null }

                    { modalRegistry ?
                        <ModalRegistry
                            closeModal={toggleModalRegistry}
                        /> : null
                    }

                    {modalCart ? <ModalCart
                        user={userName}
                        closeCart={toggleModalCart}
                    /> : null}

                    {modalAuth ? <ModalAuth
                        closeModal={toggleModalAuth}
                        openRegistryForm={toggleModalRegistry}
                    /> : null}

                </HomePage>
            </Route>
        </BrowserRouter>
    )
};

export default App