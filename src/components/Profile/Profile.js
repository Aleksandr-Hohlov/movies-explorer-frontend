import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Movies/Header/Header';

function Profile() {
  return (
    <div className="profile">
      <Header />
      <main className="profile__content">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form">
          <div className="profile__container-name">
            <p className="profile__name">Имя</p>
            <input className="profile__input" value="Виталий" minLength="3" maxLength="35" required />
          </div>
          <div className="profile__container-email">
            <p className="profile__name">E-mail</p>
            <input className="profile__input" value="pochta@yandex.ru" minLength="3" maxLength="35" required />
          </div>
          <button className="profile__button" type="submit">
            Редактировать
          </button>
        </form>

        <Link className="profile__button profile__button_signout" to="/">
          Выйти из аккаунта
        </Link>
      </main>
    </div>
  );
}

export default Profile;
