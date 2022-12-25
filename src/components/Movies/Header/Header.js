import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../../images/logo__header.svg';
import './Header.css';

const setActiveClass = ({ isActive }) => `header__films${isActive ? 'header__films_active' : ''}`;

function Header() {
  return (
    <header className="header__movies">
      <Link className="header__logo-link-movies" to="/">
        <img className="header__logo-movies" src={logo} alt="Лого"></img>
      </Link>

      <div className="header__films">
        <NavLink to="/movies" className={setActiveClass}>
          Фильмы
        </NavLink>
        <NavLink to="/saved-movies" className={setActiveClass}>
          Сохранённые фильмы
        </NavLink>
      </div>

      <Link to="/profile" className="header__account-btn">
        Аккаунт
      </Link>
    </header>
  );
}

export default Header;
