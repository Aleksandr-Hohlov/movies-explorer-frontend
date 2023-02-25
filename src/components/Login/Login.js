import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Login.css';
import logo from '../../images/logo__header.svg';

function Login({ handleLogin, loggedIn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: 'onChange' });

  function onSubmit(data) {
    handleLogin(data.email, data.password);
    reset();
  }

  if (loggedIn) {
    return (
      <main className="login">
        <header className="login__header">
          <Link className="login__header-link" to="/">
            <img className="login__header-logo" src={logo} alt="Лого" />
          </Link>
          <h1 className="login__header-title">Рады видеть!</h1>
        </header>
        <fieldset className="login__fieldset">
          <form className="login__form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <h3 className="login__form-title">E-mail</h3>
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
            <span className="login__input-error">{errors.email && errors.email.message}</span>

            <h3 className="login__form-title">Пароль</h3>
            <input
              className="register__form-input"
              type="password"
              name="password"
              {...register('password', {
                required: 'Поле обязательно для заполнения',

                pattern: {
                  value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                  message: 'Пароль должен сожержать cтрочные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов',
                },
              })}
            ></input>
            <span className="login__input-error">{errors.password && errors.password.message}</span>

            <button className="login__button" type="submit" disabled={!isValid}>
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
}

export default Login;
