import React, {useState} from 'react';
import InputFields from "../InputFields/InputFields";

const ModalAuth = (props) => {
    const {closeModal, openRegistryForm} = props;
    const [userName, setUserName] = useState('');
    const [password, setUserPassword] = useState('');
    const [errors, setErrors] = useState({
        username: "",
        password: ""
    });

    const closeModalOnDivClick = (event) => {
        return event.target.classList.contains('modal')
            ? props.closeModal()
            : null
    };

    const checkValidLogin = () => {
        const usersData = JSON.parse(localStorage.getItem("DeliveryFoodData"));
        let data;
        if (usersData) {
            data = usersData.filter(item => item.user === userName);
            if (data.length === 0) {
                const errorMessage = "Пользователь с таким логином не зарегестрирован";
                setErrors(prevState => {
                    return {...prevState, username: errorMessage}
                });
            }
            data.map(item => {
                if (item.pass !== password) {
                    const errorMessage = "Пароль указан неверно";
                    setErrors({
                        password: errorMessage
                    })
                } else if (item.user !== userName) {
                    const errorMessage = "Пользователь с таким логином не зарегестрирован";
                    setErrors({username: errorMessage});
                } else {
                    data.map(item =>  localStorage.setItem("CurrentUserData", JSON.stringify(item)));
                    localStorage.setItem("CurrentUser", userName);
                    closeModal()
                }
            })
        } else {
            const errorMessage = "Пользователь с таким логином не зарегестрирован";
            setErrors({username: errorMessage});
        }
    };


    return (
        <div className="modal"
             onClick={(e) => {closeModalOnDivClick(e)}}>

            <div className="form-container modal-dialog">
                <button className="close-auth" onClick={closeModal}>&times;</button>

                <form className="card-form"
                      onSubmit={(e) => e.preventDefault()}>
                    <fieldset className="modal-body">
                        <legend className="modal-title">Авторизация</legend>

                        <InputFields
                            id="username"
                            labelText="Имя пользователя"
                            type="text"
                            name="username"
                            value={userName}
                            onChange={event => setUserName(event.target.value)}
                            error={errors.username}
                        />

                        <InputFields
                            id="password"
                            labelText="Пароль"
                            type="password"
                            name="password"
                            value={password}
                            onChange={event => setUserPassword(event.target.value)}
                            error={errors.password}
                        />

                    </fieldset>

                    <div className="modal-footer">
                        <div className="footer-buttons">
                            <button className="button button-primary button-login" type="submit" onClick={checkValidLogin}>Войти</button>
                        </div>
                        <div className="footer-buttons">
                            <button className="button button-primary button-login" type="submit" onClick={openRegistryForm}>Зарегистрироваться</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ModalAuth
