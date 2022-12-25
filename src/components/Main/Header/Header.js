import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo__header.svg';
import './Header.css';

function Header() {
  return (
    <header className="header__main">
      <div className="header__container">
        <Link className="header__logo-link" to="/">
          <img className="header__logo-main" src={logo} alt="Лого" />
        </Link>

        <div className="header__auth-main">
          <Link className="header__registry" to="/signup">
            Регистрация
          </Link>
          <Link className="header__login" to="/signin">
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
