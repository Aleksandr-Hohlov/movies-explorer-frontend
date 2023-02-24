import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../../images/logo__header.svg';
import './Header.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function Header() {
  const currentUser = useContext(CurrentUserContext);
  const setActiveClass = ({ isActive }) => `header-movies__films${isActive ? 'header-movies__films_active' : ''}`;

  if (!!!currentUser.name) {
    return (
      <header className="header-main">
        <div className="header-main__container">
          <Link className="header-main__link" to="/movies">
            <img className="header-main__logo" src={logo} alt="Лого" />
          </Link>

          <div className="header-main__auth">
            <Link className="header-main__registry" to="/signup">
              Регистрация
            </Link>
            <Link className="header-main__login" to="/signin">
              Войти
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header-main">
      <div className="header-main__container">
        <Link className="header-main__link" to="/movies">
          <img className="header-main__logo" src={logo} alt="Лого" />
        </Link>

        <div className="header-movies__container">
          <NavLink to="/movies" className={setActiveClass}>
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className={setActiveClass}>
            Сохранённые фильмы
          </NavLink>
        </div>

        <Link to="/profile" className="header-movies__account-btn">
          Аккаунт
          <div className="header-movies__account-icon"></div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
