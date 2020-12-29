import React from 'react';
import { Link } from "react-router-dom";


import './HomeHeader.css';
import logo from '../../img/icon/logo.svg'

const HomeHeader = (props) => {
    const {userName, logOut, toggleModalAuth, toggleRestaurantMenu, toggleModalCart} = props;
    return (

        <header className="header">
            <Link className="logo" to="/" onClick={toggleRestaurantMenu}>
                <img src={logo} alt="Logo"/>
            </Link>
            <label className="address">
                <input type="text" className="input input-address" placeholder="Адрес доставки" />
            </label>
            <div className="buttons">
                <span className="user-name"> {userName ? userName : null} </span>
                <button className="button button-cart" id="cart-button" onClick={toggleModalCart}>
                    <span className="button-cart-svg" />
                    <span className="button-text">Корзина</span>
                </button>

                <button className="button button-primary button-auth" onClick={!userName ? toggleModalAuth : logOut}>
                    { !userName
                        ? <>
                            <span className="button-auth-svg" />
                            <span className="button-text">Войти</span>
                        </>
                        :  <>
                            <span className="button-text">Выйти</span>
                            <span className="button-out-svg" />
                        </>
                    }
                </button>
            </div>
        </header>

    )
};

export default HomeHeader