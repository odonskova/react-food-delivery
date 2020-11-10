import React from 'react';
import {Link} from "react-router-dom";
import './FooterNavbar.css';

import logo from '../../img/icon/logo.svg';
import instagram from '../../img/social/instagram.svg';
import facebook from '../../img/social/fb.svg';
import vk from '../../img/social/vk.svg';

const FooterNavbar = ({ toggleRestaurantMenu }) => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-block">
                    <Link to='/' onClick={toggleRestaurantMenu}>
                        <img src={logo} alt="logo" className="logo footer-logo"/>
                    </Link>

                    <nav className="footer-nav">
                        <a href="/" className="footer-link">Ресторанам </a>
                        <a href="/" className="footer-link">Курьерам</a>
                        <a href="/" className="footer-link">Пресс-центр</a>
                        <a href="/" className="footer-link">Контакты</a>
                    </nav>
                    <div className="social-links">
                        <a href="/" className="social-link"><img src={instagram} alt="instagram"/></a>
                        <a href="/" className="social-link"><img src={facebook} alt="facebook"/></a>
                        <a href="/" className="social-link"><img src={vk} alt="vk"/></a>
                    </div>
                   {/*/.social-links*/}
                </div>
                {/*/.footer-block*/}
            </div>
        </footer>
    )
};

export default FooterNavbar