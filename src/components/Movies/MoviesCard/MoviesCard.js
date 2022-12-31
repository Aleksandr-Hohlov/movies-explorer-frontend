import React from 'react';
import './MoviesCard.css';
import film from '../../../images/pic__film.png';

function MoviesCard() {
  return (
    <article className="movies-card">
      <img className="movies-card__img" src={film} alt="Кадр из фильма" />
      <div className="movies-card__container">
        <h2 className="movies-card__title">33 слова о дизайне</h2>
        <button className="movies-card__button movies-card__button_like-active" type="button"></button>
      </div>
      <p className="movies-card__duration">1ч42м</p>
    </article>
  );
}

export default MoviesCard;
