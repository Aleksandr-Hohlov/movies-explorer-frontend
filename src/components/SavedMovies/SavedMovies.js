import React, { useState, useEffect, useContext } from 'react';
import './SavedMovies.css';
import Header from '../Movies/Header/Header';
import Footer from '../Main/Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from '../../utils/Preloader/Preloader';
import { movieApi } from '../../utils/MovieApi';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedMovies({ loggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);
  const [shortMovies, setShortMovies] = useState(JSON.parse(localStorage.getItem('saved-movies-short')));
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      if (localStorage.getItem('search-saved-movies')) {
        setFilteredMovies(JSON.parse(localStorage.getItem('search-saved-movies')));
        console.log(11111);
      }
      mainApi
        .getSavedMovies()
        .then((data) => {
          const userSavedList = data.filter((m) => m.owner === currentUser._id);
          setSavedMovies(userSavedList);
          setIsPreloader(true);
          console.log(2222);
          console.log(userSavedList);
          console.log(localStorage.getItem('search-saved-movies'));
        })
        .catch((err) => {
          console.log(`Невозможно отобразить сохранненые фильмы с сервера ${err}`);
        })
        .finally(() => setIsPreloader(false));
    }
  }, [loggedIn, currentUser]);

  function filterMovie(searchValue) {
    const tempSavedMovies = searchMovies(savedMovies, searchValue);
    localStorage.setItem('search-saved-movies', JSON.stringify(tempSavedMovies));
    localStorage.setItem('saved-search-value', searchValue);

    return setFilteredMovies(tempSavedMovies);
  }

  function searchMovies(movies, value) {
    if (localStorage.getItem('saved-movies-short') === 'true') {
      const tempShortMovies = movies.filter((m) => {
        return m.duration < 40;
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
    localStorage.setItem('saved-movies-short', !shortMovies);
    filterMovie(localStorage.getItem('saved-search-value'));
    //console.log(localStorage);
  }

  function handleCardDelete(movie) {
    const savedMovieId = savedMovies.find((item) => item.movieId === movie.id || item.movieId === movie.movieId);
    console.log(savedMovieId);
    mainApi.deleteMovie(savedMovieId._id).then(() => {
      console.log('удалено');
      const newSavedMovies = savedMovies.filter((m) => {
        if (movie.id === m.movieId || movie.movieId === m.movieId) {
          return false;
        } else {
          return true;
        }
      });
      setSavedMovies(newSavedMovies);
    });
  }

  return (
    <div className="saved-movies">
      <Header />
      <main className="saved-movies__content">
        <SearchForm filter={filterMovie} handleShortFilms={handleShortFilms} shortMovies={shortMovies} />
        {isPreloader ? <Preloader /> : ''}
        <MoviesCardList movie={localStorage.getItem('search-saved-movies') ? filteredMovies : savedMovies} onCardDelete={handleCardDelete} />
      </main>
      <Footer />
    </div>
  );
}
export default SavedMovies;
