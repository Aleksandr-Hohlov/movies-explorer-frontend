import React from 'react';
import { NavLink } from 'react-router-dom';
import './PopupMenu.css';

const setActiveClass = ({ isActive }) => `popup-menu__navlink${isActive ? 'popup-menu__navlink_active' : ''}`;

function openNav() {
  document.getElementById('mySidenav').classList.add('popup-menu__container_opened');
}

function closeNav() {
  document.getElementById('mySidenav').classList.remove('popup-menu__container_opened');
}

function PopupMenu() {
  return (
    <div className="popup-menu">
      <div id="mySidenav" className="popup-menu__container">
        <div className="popup-menu__sidenav">
          <button className="popup-menu__closebtn" type="button" onClick={closeNav}>
            &times;
          </button>

          <NavLink exact className={setActiveClass} to="/">
            Главная
          </NavLink>

          <NavLink exact className={setActiveClass} to="/movies">
            Фильмы
          </NavLink>

          <NavLink className={setActiveClass} to="/saved-movies">
            Сохранённые фильмы
          </NavLink>

          <NavLink className="popup-menu__navlink popup-menu__navlink_account" to="/profile">
            Аккаунт
            <div className="popup-menu__account-icon"></div>
          </NavLink>
        </div>
      </div>

      <button className="popup-menu__openbtn" type="button" onClick={openNav}></button>
    </div>
  );
}

export default PopupMenu;
