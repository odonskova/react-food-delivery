import React, {useState, useEffect} from 'react';
import './ModalCart.css';

const ModalCart = (props) => {
    const {closeCart, cart} = props;
    const [price, setPrice] = useState(0);
    const [order, setOrder] = useState(cart);

    const totalPrice = () => {
        order.map(item => setPrice(prev => prev + (item.cost * item.count)))
    };

    const deleteOne = (id) => {
        const food = order.find(item => item.id === id);
        food.count--;
        if (food.count === 0) {
            order.splice(order.indexOf(food), 1);
        }
        setOrder(order);
        setPrice(prev => prev - food.cost)
    };

    const addOne = (id) => {
        const food = order.find(item => item.id === id);
        food.count++;
        setOrder(order);
        setPrice(prev => prev + food.cost)
    };

    const clearCart = () => {
        setOrder([]);
        setPrice(0);
    };

    useEffect(() => {
        totalPrice();
        setOrder(cart);
    }, [setOrder]);

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