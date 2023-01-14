import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import film from '../../../images/pic__film.png';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function MoviesCard({ movie, onCardLike, onCardDelete, savedMovies }) {
  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();

  const isSaved = savedMovies.some((id) => id.movieId === movie.id && id.owner === currentUser._id);

  function handleLikeClick() {
    onCardLike(movie);
  }

  function handleDeleteClick() {
    onCardDelete(movie);
  }

  return (
    <article className="movies-card">
      <a className="movies-card__trailerLink" href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
        <img className="movies-card__img" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
      </a>

      <div className="movies-card__container">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <button
          type="button"
          className={`movies-card__button ${isSaved ? 'movies-card__button_like-active' : 'movies-card__button_like-disable'}`}
          onClick={handleLikeClick}
        ></button>
      </div>
      <p className="movies-card__duration">{movie.duration}</p>
    </article>
  );
}

export default MoviesCard;

/*
  className={
    location.pathname === '/movies'
      ? savedMovies
        ? 'movies-card__button movies-card__button_like-disable'
        : 'movies-card__button movies-card__button_like-active'
      : 'movies-card__button movies-card__button_like-delete'
  }
*/
