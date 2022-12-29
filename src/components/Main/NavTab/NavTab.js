import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__container">
        <li className="navtab__link">
          <a className="navtab__link-element" href="#about-project">
            О проекте
          </a>
        </li>
        <li className="navtab__link">
          <a className="navtab__link-element" href="#techs">
            Технологии
          </a>
        </li>
        <li className="navtab__link">
          <a className="navtab__link-element" href="#about-me">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
