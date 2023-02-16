import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Movies/Header/Header';
import Footer from '../Main/Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from '../../utils/Preloader/Preloader';
import { movieApi } from '../../utils/MovieApi';

function SavedMovies({ loggedIn }) {
  useEffect(() => {
    if (loggedIn) {
      if (localStorage.getItem('search-movies')) {
        setFilteredMovies(JSON.parse(localStorage.getItem('search-movies')));
        //console.log(localStorage);
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
    //console.log(localStorage);
  }

  function handleCardDelete(m) {
    console.log(m);
  }

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isPreloader, setIsPreloader] = useState(true);
  const [shortMovies, setShortMovies] = useState(localStorage.getItem('movies-short'));
  return (
    <div className="saved-movies">
      <Header />
      <main className="saved-movies__content">
        <SearchForm filter={filterMovie} handleShortFilms={handleShortFilms} shortMovies={shortMovies} />
        {isPreloader ? <Preloader /> : ''}
        <MoviesCardList movie={filteredMovies} onCardDelete={handleCardDelete} />
      </main>
      <Footer />
    </div>
  );
}
export default SavedMovies;
