import React from 'react';

const ModalProposal = ({ openRegistryForm, closeModal }) => (
    <div className="modal">
        <div className="modal-dialog">
            <div className="modal-discount">
                <h1>Пройди регистрацию и получи скидку 50% на первый заказ.</h1>
            </div>
            <div className="modal-buttons">
                <button className="button button-primary" type="submit" onClick={openRegistryForm}>Пройти регистрацию</button>
                <button className="button button-primary" onClick={closeModal}>Перейти к оформлению заказа</button>
            </div>
        </div>
    </div>
);

export default ModalProposal