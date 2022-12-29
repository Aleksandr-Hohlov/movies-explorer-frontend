import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo__header.svg';

function Login() {
  return (
    <main className="login">
      <header className="login__header">
        <Link className="login__header-link" to="/">
          <img className="login__header-logo" src={logo} alt="Лого" />
        </Link>
        <h1 className="login__header-title">Рады видеть!</h1>
      </header>
      <fieldset className="login__fieldset">
        <form className="login__form">
          <h3 className="login__form-title">E-mail</h3>
          <input className="login__form-input" type="e-mail" />
          <span className="login__input-error"></span>

          <h3 className="login__form-title">Пароль</h3>
          <input className="login__form-input" type="password" />
          <span className="login__input-error"></span>

          <button className="login__button" type="submit">
            Войти
          </button>
          <div className="login__login-container">
            <span className="login__login-message">Ещё не зарегистрированы?</span>
            <Link className="login__login-link" to="/signup">
              Регистрация
            </Link>
          </div>
        </form>
      </fieldset>
    </main>
  );
}

export default Login;
