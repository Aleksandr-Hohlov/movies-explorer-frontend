import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import Header from '../Movies/Header/Header';
import { useForm } from 'react-hook-form';

function Profile({ onLogOut, onProfileEdit, isSubmitSuccess, disabledBtn }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  /*функция саббмита формы*/
  function onSubmit(data) {
    onProfileEdit(data);
  }

  function handleLogout() {
    localStorage.clear();
    onLogOut();
  }

  return (
    <div className="profile">
      <Header />
      <main className="profile__content">
        <h1 className="profile__title">Привет, {name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit(onSubmit)} required>
          <div className="profile__container-name">
            <p className="profile__name">Имя</p>
            <input
              className="profile__input"
              type="text"
              value={name}
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
                onChange: (e) => setName(e.target.value),
              })}
            />
            <p className="profile__input-error">{errors.name && errors.name.message}</p>
          </div>
          <div className="profile__container-email">
            <p className="profile__name">E-mail</p>
            <input
              className="profile__input"
              type="email"
              value={email}
              {...register('email', {
                required: 'Поле обязательно для заполнения',

                pattern: {
                  value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                  message: 'Введите корректно email, например "example@ex.com"',
                },
                onChange: (e) => setEmail(e.target.value),
              })}
            />
            <p className="profile__input-error">{errors.email && errors.email.message}</p>
            <p className="profile__submit-success">{isSubmitSuccess ? 'Данные успешно изменены' : ''}</p>
          </div>

          <button
            className="profile__button"
            type="submit"
            disabled={!isValid || (name === currentUser.name && email === currentUser.email) || disabledBtn}
          >
            Редактировать
          </button>
        </form>

        <Link className="profile__button profile__button_signout" to="/" onClick={handleLogout}>
          Выйти из аккаунта
        </Link>
      </main>
    </div>
  );
}

export default Profile;
