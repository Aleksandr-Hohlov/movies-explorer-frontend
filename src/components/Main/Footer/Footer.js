import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer footer_main">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2023</p>
        <nav className="footer__links">
          <a className="footer__link-element" href="https://practicum.yandex.ru/">
            Яндекс.Практикум
          </a>
          <a className="footer__link-element" href="https://github.com/Aleksandr-Hohlov">
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
