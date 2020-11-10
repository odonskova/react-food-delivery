import React from 'react';

const RestaurantMenu = (props) => {
    const {restaurantMenu, chosenRestaurant, searchedDish, addFood} = props;

    return (
        <section className="menu">
            <div className="section-heading" >
                {chosenRestaurant.length > 0
                    ? chosenRestaurant.map((item, index) => (
                        <>
                            <h2 className="section-title restaurant-title">{item.name}</h2>
                            <div className="card-info" key={index}>
                                <div className="rating">{item.stars}</div>
                                <div className="price">{`От ${item.price} грн.`}</div>
                                <div className="category">{item.kitchen}</div>
                            </div>
                        </>
                    ))
                    : <h2 className="section-title restaurant-title">{`Результаты поиска: "${searchedDish}"`}</h2>
                }
            </div>
            <div className="cards cards-menu container">
                {restaurantMenu.map((item) => {
                        return (
                            <div className="card" key={item.id}>
                                <img src={item.image} alt={item.name} className="card-image"/>
                                <div className="card-text" >
                                    <div className="card-heading">
                                        <h3 className="card-title card-title-reg">{item.name}</h3>
                                    </div>

                                    <div className="card-info">
                                        <div className="ingredients">{item.description}
                                        </div>
                                    </div>

                                    <div className="card-buttons">
                                        <button className="button button-primary button-add-cart" id={item.id} onClick={event => addFood(event, item.id, item.name, item.price)}>
                                            <span className="button-card-text">В корзину</span>
                                            <span className="button-cart-svg" />
                                        </button>
                                        <strong className="card-price-bold card-price">{item.price} ₴</strong>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                )}
            </div>
        </section>
    )
};

export default RestaurantMenu;
