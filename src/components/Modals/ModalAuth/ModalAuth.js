import React, {useState} from 'react';

const ModalAuth = (props) => {
    const {closeModal} = props;
    const [userName, setUserName] = useState('');
    const [password, setUserPassword] = useState('');
    const [errors, setErrors] = useState({
        username: "",
        password: ""
    });

    const closeModalOnDivClick = (event) => {
        return event.target.classList.contains('modal-auth')
            ? props.closeModal()
            : null
    };

    const checkValidLogin = () => {
        const usersData = JSON.parse(localStorage.getItem("DeliveryFoodData"));
        const data = usersData.filter(item => item.user === userName);
        if (data.length === 0) {
            const errorMessage = "Пользователь с таким логином не зарегестрирован";
            setErrors(prevState => {
                return { ...prevState, username: errorMessage}
            });
        } else if (data.password !== password){
            const errorMessage = "Пароль указан неверно";
            setErrors(prevState => {
                return { ...prevState, password: errorMessage}
            });
        } else {
            localStorage.setItem("CurrentUserData", data)
        }
    };


    return (
        <div className="modal"
             onClick={(e) => {closeModalOnDivClick(e)}}
        >
            <div className="form-container modal-dialog">
                <button className="close-auth" onClick={closeModal}>&times;</button>
                <form className="card-form"
                      onSubmit={(e) => e.preventDefault()}
                >
                    <fieldset className="modal-body">
                        <legend className="modal-title">Авторизация</legend>
                        <div className="form-group">
                            <label className="form-label">
                                Логин
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                autoComplete="on"
                                onChange={event => setUserName(event.target.value)}
                            />
                         { errors.username
                             ? <div className="errors-message">{errors.username}</div>
                             : null }

                        </div>


                        <div className="form-group">
                            <label className="form-label"> Пароль </label>
                            <input
                                className="form-control"
                                type="text"
                                autoComplete="on"
                                onChange={event => setUserPassword(event.target.value)}/>
                        </div>
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
