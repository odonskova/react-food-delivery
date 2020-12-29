import React from 'react'
import './ButtonUp.css';
import {scrollUp} from "../../scrollFunctions";

const ButtonUp = () => (
    <div className="menu__btn">
        <button className="menu__btn--up" onClick={scrollUp} />
    </div>

);

export default ButtonUp