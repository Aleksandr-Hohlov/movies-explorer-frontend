import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer footer_main">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2023</p>
        <nav className="footer__links">
          <a className="footer__link-element" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">
            Яндекс.Практикум
          </a>
          <a className="footer__link-element" href="https://github.com" target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
