import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo__header.svg';
import { useForm } from 'react-hook-form';

function Register({ handleRegister, loggedIn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: 'onChange' });

  function onSubmit(data) {
    handleRegister(data.name, data.email, data.password);
    reset();
  }

  if (loggedIn) {
    return (
      <main className="register">
        <header className="register__header">
          <Link className="register__header-link" to="/">
            <img className="register__header-logo" src={logo} alt="Лого"></img>
          </Link>

          <h1 className="register__header-title">Добро пожаловать!</h1>
        </header>
        <fieldset className="register__fieldset">
          <form className="register__form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <h3 className="register__form-title">Имя</h3>
            <input
              className="register__form-input"
              type="text"
              {...register('name', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 3,
                  message: 'Минимум 3 символа',
                },
                pattern: {
                  value: /^[a-zA-Z][a-zA-Z0-9-_]{2,35}$/,
                  message: 'Только латинские буквы и цифры, не более 35 символов',
                },
                //onChange: (e) => setErrName(e.target.validationMessage),
              })}
            ></input>
            <span className="register__input-error">{errors.name && errors.name.message}</span>

            <h3 className="register__form-title">E-mail</h3>
            <input
              className="register__form-input"
              type="email"
              minLength="3"
              maxLength="35"
              name="email"
              {...register('email', {
                required: 'Поле обязательно для заполнения',

                pattern: {
                  value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                  message: 'Введите корректно email, например "example@ex.com"',
                },
                // onChange: (e) => setErrEmail(e.target.validationMessage),
              })}
            ></input>
            <span className="register__input-error">{errors.email && errors.email.message}</span>

            <h3 className="register__form-title">Пароль</h3>
            <input
              className="register__form-input"
              type="password"
              name="password"
              {...register('password', {
                required: 'Поле обязательно для заполнения',

                pattern: {
                  value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                  message: 'Придумайте пароль. Должен сожержать cтрочные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов',
                },
              })}
            ></input>
            <span className="register__input-error">{errors.password && errors.password.message}</span>

            <button className="register__button" type="submit" disabled={!isValid}>
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
}

export default Register;
