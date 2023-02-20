import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import film from '../../../images/pic__film.png';
//import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { movieDuration } from '../../../utils/movieDuration';
//import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function MoviesCard({ movie, onCardLike, onCardDelete }) {
  //const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  let isSaved = true;

  function handleLikeClick() {
    console.log('function handleLikeClick');
    console.log(movie);
    onCardLike(movie);
  }

  function handleDeleteClick() {
    console.log(movie);
    console.log('function handleDeleteClick');
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
              ? isSaved
                ? 'movies-card__button movies-card__button_like-disable'
                : 'movies-card__button movies-card__button_like-active'
              : 'movies-card__button movies-card__button-delete'
          }
          onClick={location.pathname === '/movies' ? handleLikeClick : handleDeleteClick}
        ></button>
      </div>
      <p className="movies-card__duration">{movieDuration(movie.duration)}</p>
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
      : 'movies-card__button movies-card__button-delete'
  }
*/
