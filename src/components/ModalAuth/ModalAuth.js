import React, {useState, useEffect} from 'react';
import './ModalAuth.css';

const ModalAuth = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setUserPassword] = useState('');

    const closeModalOnDivClick = (event) => {
        return event.target.classList.contains('modal-auth')
            ? props.closeModal()
            : null
    };

    const checkValidLogin = () => {
        const validLogin = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
        const validPassword = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d).*$/;
        if (validLogin.test(userName) && validPassword.test(password)) {
            props.logIn(userName);
            props.closeModal()
        } else {
            alert('Введены некоректные данные')
        }
    };


     return (
        <div className="modal-auth"
             onClick={(e) => {closeModalOnDivClick(e)}}
        >
            <div className="modal-dialog modal-dialog-auth">
                <button className="close-auth" onClick={props.closeModal}>&times;</button>
                <form id="logInForm" onSubmit={(e) => e.preventDefault()}>
                    <fieldset className="modal-body">
                        <legend className="modal-title">Авторизация</legend>
                        <label className="label-auth">
                            <span>Логин</span>
                            <input id="login" type="text"
                                   autoComplete="on"
                                   onChange={event => setUserName(event.target.value)}
                                 />
                        </label>
                        <label className="label-auth">
                            <span>Пароль</span>
                            <input id="password" type="password" autoComplete="on" onChange={event => setUserPassword(event.target.value)}/>
                        </label>
                    </fieldset>

                    <div className="modal-footer">
                        <div className="footer-buttons">
                            <button className="button button-primary button-login" type="submit" onClick={checkValidLogin}>Войти</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ModalAuth
