import React from 'react';
import ButtonUp from "../ButtonUp/ButtonUp";


const Restaurants = ({restaurants, openMenu}) => {
    return (
        <>
            <div className="cards cards-restaurants">
                <ButtonUp />
                {restaurants.map((restaurant, index) => {
                    return (
                        <a
                            href="/"
                            className="card card-restaurant"
                            key={index}
                            onClick={(event) => openMenu(event, restaurant.products, restaurant)}
                        >
                            <img src={restaurant.image} alt="card" className="card-image"/>
                            <div className="card-text">
                                <div className="card-heading">
                                    <h3 className="card-title">{restaurant.name}</h3>
                                    <span className="card-tag tag">{restaurant.time_of_delivery} мин</span>
                                </div>
                                <div className="card-info">
                                    <div className="rating">
                                        4.5
                                    </div>
                                    <div className="price">От {restaurant.price} ₴</div>
                                    <div className="category">{restaurant.kitchen}</div>
                                </div>
                            </div>
                        </a>
                    )})}
            </div>
        </>
    )
};

export default Restaurants;