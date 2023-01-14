import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../../images/logo__header.svg';
import './Header.css';
import PopupMenu from '../../../utils/PopupMenu/PopupMenu';

const setActiveClass = ({ isActive }) => `header-movies__films${isActive ? 'header-movies__films_active' : ''}`;

function Header() {
  return (
    <header className="header-movies">
      <Link className="header-movies__logo-link" to="/">
        <img className="header-movies__logo" src={logo} alt="Лого"></img>
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
      <div className="header-movies__sidenav">
        <PopupMenu />
      </div>
    </header>
  );
}

export default Header;
