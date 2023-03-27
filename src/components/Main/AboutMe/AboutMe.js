import React from 'react';
import './AboutMe.css';
import foto from '../../../images/about-me__foto.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title main-title">О себе</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__student-name">Александр Хохлов</h3>
          <h4 className="about-me__subtitle">Фронтенд-разработчик, 31 год</h4>
          <p className="about-me__text">
            Я живу в Краснодаре, закончил факультет экономики в КубГТУ. Женат на прекрасной девушке. Люблю путешествовать, посетил практически все
            красивые места в радиусе 500 км от Краснодара, посетил 3 страны, в планах +1 страна в год. Стараюсь посещать спортзал несколько раз в
            неделю и развивать себя как личность, читая художественную и обучающюю литературу (тут с переменным успехом, но я стараюсь).
          </p>
          <p className="about-me__text">
            Закончил обучение в Яндекс Практикум по специальности Фронтенд-разработчик. Сейчас активно приступил к поиску работы по новой
            специальности. Рассматриваю переезд в Москву для поиска подходящего предложения.
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
