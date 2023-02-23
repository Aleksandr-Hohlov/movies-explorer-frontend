import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import Header from '../Movies/Header/Header';
import { mainApi } from '../../utils/MainApi';

function Profile({ onLogOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  //const history = useHistory();

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  /*функция саббмита формы*/
  function handleSubmit(e) {
    e.preventDefault();
    mainApi
      .patchUserInfo({
        name: name,
        email: email,
      })
      .catch((err) => {
        console.log(`Невозможно загрузить данные на сервер ${err}`);
      });
  }

  function handleLogout() {
    localStorage.clear();
    onLogOut();
    //history.push('/');
    // window.location.reload();
  }

  return (
    <div className="profile">
      <Header />
      <main className="profile__content">
        <h1 className="profile__title">Привет, {name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__container-name">
            <p className="profile__name">Имя</p>
            <input className="profile__input" onChange={handleChangeName} value={name} minLength="3" maxLength="35" required />
          </div>
          <div className="profile__container-email">
            <p className="profile__name">E-mail</p>
            <input className="profile__input" minLength="3" maxLength="35" required onChange={handleChangeEmail} value={email} />
          </div>
          <button className="profile__button" type="submit">
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
