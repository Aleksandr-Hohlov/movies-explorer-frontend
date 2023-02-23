import React from 'react';
import { useLocation } from 'react-router-dom';
import './MovieCard.css';

import { movieDuration } from '../../../utils/movieDuration';

function MovieCard({ movie, onCardLike, onCardDelete, isSaved }) {
  const location = useLocation();

  function handleLikeClick() {
    onCardLike(movie);
  }

  function handleDeleteClick() {
    onCardDelete(movie);
  }

  return (
    <article className="movies-card">
      <a className="movies-card__trailerLink" href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
        <img
          className="movies-card__img"
          src={location.pathname === '/movies' ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
          alt={movie.nameRU}
        />
      </a>

      <div className="movies-card__container">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <button
          type="button"
          className={
            location.pathname === '/movies'
              ? !isSaved
                ? 'movies-card__button movies-card__button_like-disable'
                : 'movies-card__button movies-card__button_like-active'
              : 'movies-card__button movies-card__button-delete'
          }
          onClick={location.pathname === '/movies' ? (!isSaved ? handleLikeClick : handleDeleteClick) : handleDeleteClick}
        ></button>
      </div>
      <p className="movies-card__duration">{movieDuration(movie.duration)}</p>
    </article>
  );
}

export default MovieCard;
