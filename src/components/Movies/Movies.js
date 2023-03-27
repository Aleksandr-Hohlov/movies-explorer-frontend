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
import StatusMessage from '../../utils/StatusMessage/StatusMessage';

function Movies({ loggedIn }) {
  const [filteredMovies, setFilteredMovies] = useState(['']);
  const [allMovies, setAllMovies] = useState([]);
  const [isPreloader, setIsPreloader] = useState(true);
  const [shortMovies, setShortMovies] = useState(JSON.parse(localStorage.getItem('movies-short')));
  const [savedMovies, setSavedMovies] = useState([]);
  const currentUser = useContext(CurrentUserContext);
  // Уведомления об ошибках
  const [message, setMessage] = useState('');
  const [isActiveMessage, setIsActiveMessage] = useState(false);
  const [requestStatus, setRequestStatus] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getSavedMovies()
        .then((data) => {
          setSavedMovies(data.filter((m) => m.owner === currentUser._id));
        })
        .catch((err) => {
          console.log(`Ошибка при получении фильмов (${err})`);
          setMessage(`Ошибка при получении фильмов (${err})`);
          setIsActiveMessage(true);
          setRequestStatus(false);
        })
        .finally(() => {
          setTimeout(() => setIsActiveMessage(false), 2000);
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
          setIsPreloader(true);
          setAllMovies(data);
        })
        .catch((err) => {
          console.log(`Ошибка при получении фильмов (${err})`);
          setMessage(`Ошибка при получении фильмов (${err})`);
          setIsActiveMessage(true);
          setRequestStatus(false);
        })
        .finally(() => {
          setIsPreloader(false);
          setTimeout(() => setIsActiveMessage(false), 2000);
        });
    } else {
      movieApi
        .getMovies()
        .then((data) => {
          setAllMovies(data);
        })
        .catch((err) => {
          console.log(`Ошибка при получении фильмов (${err})`);
          setMessage(`Ошибка при получении фильмов (${err})`);
          setIsActiveMessage(true);
          setRequestStatus(false);
        })
        .finally(() => {
          setIsPreloader(false);
          setTimeout(() => setIsActiveMessage(false), 2000);
        });
    }
  }, [loggedIn, currentUser]);

  function filterMovie(searchValue) {
    const tempMovies = searchMovies(allMovies, searchValue);
    localStorage.setItem('search-movies', JSON.stringify(tempMovies));
    localStorage.setItem('search-value', searchValue);

    return setFilteredMovies(tempMovies);
  }

  function searchMovies(movies, value) {
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
    setShortMovies(!shortMovies);
    localStorage.setItem('movies-short', !shortMovies);
    filterMovie(localStorage.getItem('search-value'));
  }

  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((data) => {
        setSavedMovies([data, ...savedMovies]);
      })
      .catch((err) => {
        console.log(`Ошибка при сохраннении фильмов (${err})`);
        setMessage(`Ошибка при сохраннении фильмов (${err})`);
        setIsActiveMessage(true);
        setRequestStatus(false);
      })
      .finally(() => {
        setTimeout(() => setIsActiveMessage(false), 2000);
      });
  }

  function handleCardDelete(movie) {
    const savedMovieId = savedMovies.find((m) => m.movieId === movie.id || m.movieId === movie.movieId);
    mainApi
      .deleteMovie(savedMovieId._id)
      .then(() => {
        const newSavedMovies = savedMovies.filter((m) => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка при сохраннении фильмов (${err})`);
        setMessage(`Ошибка при сохраннении фильмов (${err})`);
        setIsActiveMessage(true);
        setRequestStatus(false);
      })
      .finally(() => {
        setTimeout(() => setIsActiveMessage(false), 2000);
      });
  }

  return (
    <div className="movies">
      <Header />
      <StatusMessage isActiveMessage={isActiveMessage} message={message} requestStatus={requestStatus} />
      <main className="movies__content">
        <SearchForm filter={filterMovie} handleShortFilms={handleShortFilms} shortMovies={shortMovies} />
        {isPreloader ? <Preloader /> : ''}
        <MoviesCardList
          movie={localStorage.getItem('search-movies') ? filteredMovies : allMovies}
          onCardLike={handleSaveMovie}
          onCardDelete={handleCardDelete}
          savedMovies={savedMovies}
        />
      </main>
      <Footer />
    </div>
  );
}
export default Movies;
