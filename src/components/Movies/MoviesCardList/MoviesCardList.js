import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { movieApi } from '../../../utils/MovieApi';
import { mainApi } from '../../../utils/MainApi';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function MoviesCardList() {
  const currentUser = React.useContext(CurrentUserContext);
  const [movie, setMovie] = React.useState([]);

  const [savedMovies, setSavedMovies] = useState([]);

  React.useEffect(() => {
    Promise.all([movieApi.getMovies()])
      .then(([movie]) => {
        setMovie(movie);
      })
      .catch((err) => console.log(err));
  }, []);

  //сохраняю фильм и обновляю список сохраненных
  function handleSaveMovie(movie) {
    console.log('handleSaveMovie');
    const isSaved = savedMovies.some((id) => id.movieId === movie.id && id.owner === currentUser._id);

    if (!isSaved) {
      mainApi.saveMovie(movie, !isSaved);
    }
  }

  //удаляю и сразу обновляю массив сохраненных фильмов
  function handleDeleteMovie(movie) {
    console.log('handleDeleteMovie');
    /*const savedMovieId = savedMovies.find(
    (item) => item.movieId === movie.id || item.movieId === movie.movieId
  );
  api.deleteMovie(savedMovieId._id)
    .then(() => {
      console.log('удалено')
      const newSavedMovies = savedMovies.filter(m => {
        if (movie.id === m.movieId || movie.movieId === m.movieId) {
          return false;
        } else {
          return true;
        }
      });
      setSavedMovies(newSavedMovies);
    })
    .catch((err) => {
      console.log(`Невозможно удалить фильм: ${err}`);
    })*/
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

export default MoviesCardList;
