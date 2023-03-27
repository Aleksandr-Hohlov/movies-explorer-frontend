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
          <a
            className="portfolio__element-link-github"
            href="https://github.com/Aleksandr-Hohlov/first-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            код на Github
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
          <a
            className="portfolio__element-link-github"
            href="https://github.com/Aleksandr-Hohlov/russian-travel"
            target="_blank"
            rel="noopener noreferrer"
          >
            код на Github
          </a>
        </li>
        <li className="portfolio__element">
          <a className="portfolio__element-link" href="https://aleksandr-hohlov.github.io/mesto/" target="_blank" rel="noopener noreferrer">
            Одностраничное приложение
          </a>
          <a
            className="portfolio__element-link-github"
            href="https://github.com/Aleksandr-Hohlov/mesto-react"
            target="_blank"
            rel="noopener noreferrer"
          >
            код на Github
          </a>
        </li>
        <li className="portfolio__element">
          <a className="portfolio__element-link" href="https://movies-hohlov.nomoredomains.rocks/signup" target="_blank" rel="noopener noreferrer">
            Backend Проекта по поиску фильмов
          </a>
          <a
            className="portfolio__element-link-github"
            href="https://github.com/Aleksandr-Hohlov/movies-explorer-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            код на Github
          </a>
        </li>
        <li className="portfolio__element">
          <a className="portfolio__element-link" href="https://movies-hohlov.nomoredomains.rocks/signup" target="_blank" rel="noopener noreferrer">
            Проект по поиску фильмов
          </a>
          <a
            className="portfolio__element-link-github"
            href="https://github.com/Aleksandr-Hohlov/movies-explorer-frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            код на Github
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
