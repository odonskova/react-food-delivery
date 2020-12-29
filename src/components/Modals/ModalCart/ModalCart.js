import React, {useEffect, useState} from 'react';
import './ModalCart.css';


const ModalCart = ({ closeCart, user }) => {
    const currentUserData = JSON.parse(localStorage.getItem("CurrentUserData"));
    const deliveryFoodData = JSON.parse(localStorage.getItem("DeliveryFoodData"));
    const [order, setOrder] = useState([]);
    const [price, setPrice] = useState(totalPrice());

    useEffect(() => {
        if (!user || !currentUserData) {
            setOrder([])
        } else {
            setOrder(currentUserData.cart)
        }
    }, []);

    useEffect(() => {
        setPrice(price)
    }, []);

    function totalPrice() {
        let result = 0;
        if (!currentUserData) {
            result = 0
        } else {
            currentUserData.cart.map(order => result += order.cost * order.count);
        }
        return result
    }

    const deleteOne = (id) => {
        const food = order.find(item => item.id === id);
        food.count--;
        if (food.count === 0) {
            order.splice(order.indexOf(food), 1);
        }
        setOrder(order);
        setPrice(prev => prev - food.cost);
        currentUserData.cart = order;
        localStorage.setItem("CurrentUserData", JSON.stringify(currentUserData));
    };

    const addOne = (id) => {
        const food = order.find(item => item.id === id);
        food.count++;
        setOrder(order);
        setPrice(prev => prev + food.cost);
        currentUserData.cart = order;
        localStorage.setItem("CurrentUserData", JSON.stringify(currentUserData));
    };

    const clearCart = () => {
        setOrder([]);
        setPrice(0);
        currentUserData.cart = [];
        const filteredDeliveryData = deliveryFoodData.filter(userData => userData.user !== user);
        const newDeliveryData = [...filteredDeliveryData, ...new Array(currentUserData)];
        localStorage.setItem("DeliveryFoodData", JSON.stringify(newDeliveryData));
        localStorage.setItem("CurrentUserData", JSON.stringify(currentUserData));
    };

    return (
        <div className="modal modal-cart">
            <div className="modal-dialog cart-width">
                <div className="modal-header">
                    <h3 className="modal-title">Корзина</h3>
                    <button className="close" onClick={closeCart}>&times;</button>
                </div>

                { order.map(item => (
                    <div className="modal-body" key={item.id} id={item.id}>
                        <div className="food-row">
                            <span className="food-name">{item.title}</span>
                            <strong className="food-price">{item.cost} ₴</strong>

                            <div className="food-counter">
                                <button className="counter-button" onClick={() => deleteOne(item.id)}>-</button>
                                <span className="counter">{item.count}</span>
                                <button className="counter-button" onClick={() => addOne(item.id)}>+</button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="modal-footer" key={Math.random()}>
                    <span className="modal-pricetag">{price} ₴</span>
                    <div className="footer-buttons">
                        <button className="button button-primary">Оформить заказ</button>
                        <button className="button clear-cart" onClick={clearCart}>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ModalCart