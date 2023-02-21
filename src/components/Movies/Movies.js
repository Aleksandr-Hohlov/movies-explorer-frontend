import React, { useState, useEffect, useContext } from 'react';
import './Movies.css';
import Header from './Header/Header';
import Footer from '../Main/Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { movieApi } from '../../utils/MovieApi';
import { mainApi } from '../../utils/MainApi';
import Preloader from '../../utils/Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Movies({ loggedIn }) {
  const [filteredMovies, setFilteredMovies] = useState(['']);
  const [allMovies, setAllMovies] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);
  const [shortMovies, setShortMovies] = useState(JSON.parse(localStorage.getItem('movies-short')));
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMovies2, setSavedMovies2] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getSavedMovies()
        .then((data) => {
          const userSavedList2 = data.filter((m) => m.owner === currentUser._id);
          console.log(userSavedList2);
          setSavedMovies2(userSavedList2);
        })
        .catch((err) => {
          console.log(`Невозможно отобразить сохранненые фильмы с сервера ${err}`);
        });
    }
  }, [loggedIn, currentUser]);

  useEffect(() => {
    if (loggedIn) {
      if (localStorage.getItem('search-movies')) {
        setFilteredMovies(JSON.parse(localStorage.getItem('search-movies')));
      }
      movieApi
        .getMovies()
        .then((data) => {
          //setIsPreloader(true);
          setAllMovies(data);
        })
        .catch((err) => {
          console.log(`Невозможно отобразить фильмы с сервера ${err}`);
        })
        .finally(() => setIsPreloader(false));
    } else {
      movieApi
        .getMovies()
        .then((data) => {
          setAllMovies(data);
          //console.log(data);
        })
        .catch((err) => {
          console.log(`Невозможно отобразить фильмы с сервера ${err}`);
        });
    }
  }, [loggedIn, currentUser]);

  function filterMovie(searchValue) {
    const tempMovies = searchMovies(allMovies, searchValue);
    localStorage.setItem('search-movies', JSON.stringify(tempMovies));
    localStorage.setItem('search-value', searchValue);
    //console.log(1111111111);
    return setFilteredMovies(tempMovies);
  }

  function searchMovies(movies, value) {
    console.log(movies);
    if (localStorage.getItem('movies-short') === 'true') {
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
    //console.log(1111111111);
    setShortMovies(!shortMovies);
    localStorage.setItem('movies-short', !shortMovies);
    filterMovie(localStorage.getItem('search-value'));
    //console.log(localStorage);
  }

  function handleSaveMovie(movie) {
    console.log(movie);
    mainApi
      .saveMovie(movie)
      .then((data) => {
        console.log(data);
        setSavedMovies([data, ...savedMovies]);
        /// проверить !!! localStorage.setItem('search-saved-movies', movie); !!!!!!!!!!!!!!!!!!!!!!!!!!
        //localStorage.setItem('search-saved-movies', JSON.stringify(data));
        //localStorage.setItem('search-saved-movies', JSON.stringify(movie));
      })
      .catch((err) => {
        console.log(`Невозможно загрузить данные на сервер ${err}`);
      });
  }

  function handleCardDelete(movie) {
    const savedMovieId = savedMovies.find((item) => item.movieId === movie.id || item.movieId === movie.movieId);
    console.log(savedMovieId);
    mainApi.deleteMovie(savedMovieId._id).then(() => {
      console.log('удалено');
    });
  }

  console.log(localStorage);

  return (
    <div className="movies">
      <Header />
      <main className="movies__content">
        <SearchForm filter={filterMovie} handleShortFilms={handleShortFilms} shortMovies={shortMovies} />
        {isPreloader ? <Preloader /> : ''}
        <MoviesCardList movie={localStorage.getItem('search-movies') ? filteredMovies : allMovies} onCardLike={handleSaveMovie} />
      </main>
      <Footer />
    </div>
  );
}
export default Movies;
