import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from './Header/Header';
import Footer from '../Main/Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { movieApi } from '../../utils/MovieApi';
import { mainApi } from '../../utils/MainApi';
import Preloader from '../../utils/Preloader/Preloader';

function Movies({ loggedIn }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isPreloader, setIsPreloader] = useState(true);
  const [shortMovies, setShortMovies] = useState(localStorage.getItem('movies-short'));
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      if (localStorage.getItem('search-movies')) {
        setFilteredMovies(JSON.parse(localStorage.getItem('search-movies')));
        //console.log(shortMovies);
        //console.log(localStorage.getItem('movies-short'));
      }
      movieApi

        .getMovies()
        .then((data) => {
          //console.log(shortMovies);
          setIsPreloader(true);
          setAllMovies(data);
          localStorage.setItem('movies-short', shortMovies);
          //console.log(localStorage.getItem('movies-short'));
        })
        .catch((err) => {
          console.log(`Невозможно отобразить фильмы с сервера ${err}`);
        })
        .finally(() => setIsPreloader(false));
    }
  }, [loggedIn]);

  function filterMovie(searchValue) {
    const tempMovies = searchMovies(allMovies, searchValue);
    localStorage.setItem('search-movies', JSON.stringify(tempMovies));
    localStorage.setItem('search-value', searchValue);

    return setFilteredMovies(tempMovies);
  }

  function searchMovies(movies, value) {
    if (localStorage.getItem('movies-short') === 'true') {
      const tempShortMovies = movies.filter((m) => {
        return m.duration < 84;
      });
      return tempShortMovies.filter((m) => {
        return m.nameRU.toLowerCase().includes(value.toLowerCase());
      });
    } else {
      return movies.filter((m) => {
        return m.nameRU.toLowerCase().includes(value.toLowerCase());
      });
    }
  }

  function handleShortFilms() {
    setShortMovies(!shortMovies);
    localStorage.setItem('movies-short', !shortMovies);
    filterMovie(localStorage.getItem('search-value'));
    console.log(localStorage);
  }

  function handleCardLike(movie) {
    console.log(22222);
    console.log(movie);
    mainApi
      .saveMovie(movie)
      .then((data) => setSavedMovies([data, ...savedMovies]))
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(`Невозможно загрузить данные на сервер ${err}`);
      });
  }

  return (
    <div className="movies">
      <Header />
      <main className="movies__content">
        <SearchForm filter={filterMovie} handleShortFilms={handleShortFilms} shortMovies={shortMovies} />
        {isPreloader ? <Preloader /> : ''}
        <MoviesCardList movie={filteredMovies} onCardLike={handleCardLike} />
      </main>
      <Footer />
    </div>
  );
}
export default Movies;
