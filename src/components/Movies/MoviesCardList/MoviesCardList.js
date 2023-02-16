import React, { useState, useEffect, useLocation } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { movieApi } from '../../../utils/MovieApi';
import { mainApi } from '../../../utils/MainApi';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { DECK_SIZE, TABLET_SIZE, MOBILE_SIZE } from '../../../utils/constants';

function MoviesCardList({ movie, onCardLike, onCardDelete }) {
  const moviesCount = DECK_SIZE || TABLET_SIZE || MOBILE_SIZE;
  const [countMovies, setCountMovies] = useState(moviesCount);
  const [freeCell, setFreeCell] = useState(0);

  function resizeWindow() {
    const moviesCountResize = DECK_SIZE || TABLET_SIZE || MOBILE_SIZE;
    setCountMovies(moviesCountResize);
  }

  //функция работы кнопки "ещё"
  function handleButtonMore() {
    console.log(countMovies);
    if (window.innerWidth >= 1181) {
      setCountMovies(countMovies + 3);
    } else {
      setCountMovies(countMovies + 2);
    }
  }

  //добавляю слушатель ресайза экрана
  useEffect(() => {
    window.addEventListener('resize', resizeWindow);
  }, []);

  //проверяю количество свободных ячеек
  useEffect(() => {
    setFreeCell(movie.length - countMovies);
  }, [movie]);

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__elements">
        {movie.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} onCardDelete={onCardDelete} onCardLike={onCardLike} />
        ))}
      </div>
      {movie.length > 0 ? (
        <button
          className={movie.length > moviesCount ? 'movies-card-list__more-btn' : 'movies-card-list__more-btn_hidden'}
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

/*
function MoviesCardList({ movie, onCardLike, onCardDelete, savedMovies }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [movie, setMovie] = React.useState([]);

  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    console.log(111111);
    Promise.all([movieApi.getMovies()])
      .then(([movie]) => {
        setMovie(movie);
      })
      .catch((err) => console.log(err));
  }, []);

  //сохраняю фильм и обновляю список сохраненных
  function handleSaveMovie(movie) {
    console.log('handleSaveMovie');
  }

  //удаляю и сразу обновляю массив сохраненных фильмов
  function handleDeleteMovie(movie) {
    console.log('handleDeleteMovie');
  }

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__elements">
        {movie.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} onCardLike={handleSaveMovie} onCardDelete={handleDeleteMovie} savedMovies={savedMovies} />
        ))}
      </div>
      <button className="movies-card-list__more-btn" type="button">
        Еще
      </button>
    </section>
  );
}

*/
