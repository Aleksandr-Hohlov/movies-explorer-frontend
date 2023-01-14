import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo__header.svg';

function Register({ handleRegister, isDataSet }) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    name: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password, name } = data;
    handleRegister(email, password, name);
  }

  return (
    <main className="register">
      <header className="register__header">
        <Link className="register__header-link" to="/">
          <img className="register__header-logo" src={logo} alt="Лого"></img>
        </Link>

        <h1 className="register__header-title">Добро пожаловать!</h1>
      </header>
      <fieldset className="register__fieldset">
        <form className="register__form" onSubmit={handleSubmit}>
          <h3 className="register__form-title">Имя</h3>
          <input
            className="register__form-input"
            type="text"
            minLength="3"
            maxLength="35"
            required
            onChange={handleChange}
            value={data.name}
            id="name"
            name="name"
          ></input>
          <span className="register__input-error"></span>

          <h3 className="register__form-title">E-mail</h3>
          <input
            className="register__form-input"
            type="e-mail"
            minLength="3"
            maxLength="35"
            id="email"
            name="email"
            required
            onChange={handleChange}
            value={data.email}
          ></input>
          <span className="register__input-error"></span>

          <h3 className="register__form-title">Пароль</h3>
          <input
            className="register__form-input"
            type="password"
            minLength="3"
            maxLength="35"
            id="password"
            name="password"
            required
            onChange={handleChange}
            value={data.password}
          ></input>
          <span className="register__input-error"></span>

          <button className="register__button" type="submit">
            Зарегистрироваться
          </button>
          <div className="register__login-container">
            <span className="register__login-message">Уже зарегистрированы?</span>
            <Link className="register__login-button" to="/signin">
              Войти
            </Link>
          </div>
        </form>
      </fieldset>
    </main>
  );
}

export default Register;
