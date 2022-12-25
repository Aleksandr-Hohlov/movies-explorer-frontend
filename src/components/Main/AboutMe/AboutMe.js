import React from 'react';
import './AboutMe.css';
import foto from '../../../images/about-me__foto.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title about-project__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__student-name">Александр Хохлов</h3>
          <h4 className="about-me__subtitle">Фронтенд-разработчик, 31 год</h4>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="about-me__github" href="https://github.com/Aleksandr-Hohlov" target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </div>
        <img className="about-me__foto" alt="Фото профиля" src={foto} />
      </div>
    </section>
  );
}

export default AboutMe;
