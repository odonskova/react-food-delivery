import React from 'react';
import './ModalRegistry.css';
import InputFields from "../InputFields/InputFields";
import deliveryDistrict from '../../../db/districtsData'

export default class ModalRegistry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            repeatPassword: "",
            deliveryDistrict: "",
            address: "",
            errors: {
                username: false,
                password: false,
                repeatPassword: false,
            },
            usersData: JSON.parse(localStorage.getItem("DeliveryFoodData")) || [],
        }
    }

    onChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        }, () => {
            if (this.state.usersData) {
                this.state.usersData.map(item => {
                    return this.setState({
                        errors: {
                            username: item.user ===  this.state.username ? "Пользователь с таким логином уже зарегестрирован" : false
                        }
                    })

                })
            }
        })
    };

    onSubmit = (event) => {
        event.preventDefault();
        const usersData = this.state.usersData;
        const validLogin = /^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$/;
        const validPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
        const errors = {};

        if (!validLogin.test(this.state.username)) {
            errors.username = "Минимальня длина логина от 2 символов, могут быть буквы и цифры, первый символ обязательно буква"
        }
        if (this.state.errors.username) {
            errors.username = "Пользователь с таким логином уже зарегестрирован"
        }
        if (!validPassword.test(this.state.password)) {
            errors.password = "Минимальная длина пароля 8 символов, минимум одна заглавня буква, минимум одна цифра"
        }
        if (this.state.repeatPassword !== this.state.password) {
            errors.repeatPassword = "Пороли должны совпадать"
        }

        if (Object.keys(errors).length > 0) {
            this.setState({
                errors
            })
        } else {
            let currentUserData = {
                user: this.state.username,
                pass: this.state.password,
                repeatPassword: this.state.repeatPassword,
                delivery: deliveryDistrict[this.state.deliveryDistrict].name,
                address: this.state.address,
                cart: []
            };
            let data = null
            if (usersData.length > 0) {
                data = [...usersData, currentUserData];
            } else {
                data = [currentUserData]
            }

            this.setState({
                usersData: data,
                errors: {}
            });
            localStorage.setItem("DeliveryFoodData", JSON.stringify(data));
            localStorage.setItem("CurrentUserData", JSON.stringify(currentUserData));
            localStorage.setItem("CurrentUser", this.state.username);
            this.props.closeModal()
        }
    };

    getDistrictItems(data) {
        return data.map(item => (
            <option value={item.id} key={item.id}> {item.name} </option>
        ))
    }

    render() {
        return (
            <div className="modal">
                <div className="form-container modal-dialog">
                    <button className="close-auth" onClick={this.props.closeModal}>&times;</button>
                    <form className="card-form">
                        <fieldset className="modal-body">
                            <legend className="modal-title">Регистрация</legend>

                            <InputFields
                                id="username"
                                labelText="Имя пользователя"
                                type="text"
                                placeholder="Введите имя пользователя"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChange}
                                error={this.state.errors.username}
                            />

                            <InputFields
                                id="password"
                                labelText="Пароль"
                                type="password"
                                placeholder="Введите пароль"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                error={this.state.errors.password}
                            />

                            <InputFields
                                id="repeatPassword"
                                labelText="Введите пароль повторно"
                                type="password"
                                placeholder="Введите пароль"
                                name="repeatPassword"
                                value={this.state.repeatPassword}
                                onChange={this.onChange}
                                error={this.state.errors.repeatPassword}
                            />

                            <div className="form-group">
                                <label htmlFor="district" className="formRegistry-label">
                                    Выберите район города для доставки
                                </label>
                                <select
                                    id="district"
                                    className="form-control"
                                    name="deliveryDistrict"
                                    value={this.state.deliveryDistrict}
                                    onChange={this.onChange}>
                                    <option value="" disabled hidden>Выберите район</option>
                                    { this.getDistrictItems(deliveryDistrict)}
                                </select>
                            </div>

                            <InputFields
                                id="address"
                                labelText="Адрес доставки"
                                type="text"
                                placeholder="Введите улицу/№ дома/№ квартиры"
                                name="address"
                                value={this.state.address}
                                onChange={this.onChange}
                            />

                        </fieldset>

                        <div className="modal-buttons">
                            <button className="button button-primary"
                                    type="submit"
                                    onClick={this.onSubmit}
                            >Зарегистрироваться
                            </button>


                            <button className="button"
                                    onClick={this.props.closeModal}
                            >Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
