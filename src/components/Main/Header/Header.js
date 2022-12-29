import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo__header.svg';
import './Header.css';

function Header() {
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

export default Header;
