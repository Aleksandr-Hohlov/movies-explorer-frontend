import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import { VALUE_SCREENWIDTH, SET_COUNTMOVIES_12, SET_COUNTMOVIES_6 } from '../../../constants/constants';

function MoviesCardList({ movie, onCardLike, onCardDelete, savedMovies = [] }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [countMovies, setCountMovies] = useState(0);

  const location = useLocation();

  //добавляю слушатель ресайза экрана
  useEffect(() => {
    const resizeWindow = () => {
      setTimeout(() => setScreenWidth(window.innerWidth), 500);
    };
    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, []);

  useEffect(() => {
    if (screenWidth >= VALUE_SCREENWIDTH) {
      setCountMovies(SET_COUNTMOVIES_12);
    } else {
      setCountMovies(SET_COUNTMOVIES_6);
    }
  }, [screenWidth]);

  //функция работы кнопки "ещё"
  function handleButtonMore() {
    if (screenWidth >= VALUE_SCREENWIDTH) {
      setCountMovies(countMovies + SET_COUNTMOVIES_12);
    } else {
      setCountMovies(countMovies + SET_COUNTMOVIES_6);
    }
  }

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__elements">
        {movie.slice(0, countMovies).map((movie) => (
          <MovieCard
            key={location.pathname === '/movies' ? movie.id : movie._id}
            movie={movie}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
            isSaved={!!savedMovies.find((savedMovie) => savedMovie.movieId === movie.id || savedMovie.movieId === movie.movieId)}
          />
        ))}
      </div>
      {movie.length > 0 ? (
        <button
          className={movie.length > countMovies ? 'movies-card-list__more-btn' : 'movies-card-list__more-btn_hidden'}
          type="button"
          onClick={handleButtonMore}
        >
          Еще
        </button>
      ) : (
        <p className="movies-card-list__message">Ничего не найдено</p>
      )}
    </section>
  );
}

export default MoviesCardList;
