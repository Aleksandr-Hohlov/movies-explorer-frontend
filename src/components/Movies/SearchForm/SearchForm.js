import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import loupe from '../../../images/search-icon.svg';
import './SearchForm.css';
import ToggleSwitch from '../../../utils/ToggleSwitch/ToggleSwitch';

function SearchForm({ filter, handleShortFilms, shortMovies }) {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('search-value'));
  const [saveSearchValue, setSaveSearchValue] = useState(localStorage.getItem('saved-search-value'));
  const location = useLocation();

  /*Функции изменения инпутов*/
  function handleSearchValueChange(e) {
    location.pathname === '/movies' ? setSearchValue(e.target.value) : setSaveSearchValue(e.target.value);
  }

  /*функция саббмита формы поиска*/
  function handleSubmit(e) {
    e.preventDefault();
    localStorage.removeItem('search-movies');
    setSearchValue(searchValue);
    filter(searchValue);
    console.log(searchValue);
  }

  function handleSubmitSavedMovies(e) {
    e.preventDefault();
    localStorage.removeItem('saved-search-value');
    setSaveSearchValue(saveSearchValue);
    filter(saveSearchValue);
    console.log(saveSearchValue);
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <img className="search-form__loupe" src={loupe} alt="Лупа" />
        <form className="search-form__form" onSubmit={location.pathname === '/movies' ? handleSubmit : handleSubmitSavedMovies}>
          <input
            className="search-form__input"
            type="search"
            placeholder="Фильм"
            minLength="3"
            /*required*/
            onChange={handleSearchValueChange}
            value={location.pathname === '/movies' ? searchValue : saveSearchValue}
          ></input>
          <button className="search-form__submit-btn" type="submit">
            Найти
          </button>
        </form>

        <div className="search-form__toggle-switch">
          <ToggleSwitch handleShortFilms={handleShortFilms} shortMovies={shortMovies} />
          <span className="search-form__shot-movie">Короткометражки</span>
        </div>
      </div>

      <div className="search-form__border-bottom"></div>
    </section>
  );
}

export default SearchForm;
