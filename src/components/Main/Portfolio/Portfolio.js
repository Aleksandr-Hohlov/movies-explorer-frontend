import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__element">
          <a className="portfolio__element-link" href="https://aleksandr-hohlov.github.io/first-project" target="_blank" rel="noopener noreferrer">
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__element">
          <a
            className="portfolio__element-link"
            href="https://aleksandr-hohlov.github.io/russian-travel/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__element">
          <a className="portfolio__element-link" href="https://aleksandr-hohlov.github.io/mesto/" target="_blank" rel="noopener noreferrer">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
