import React, { useState } from 'react';
import loupe from '../../../images/search-icon.svg';
import './SearchForm.css';
import ToggleSwitch from '../../../utils/ToggleSwitch/ToggleSwitch';

function SearchForm({ filter, handleShortFilms, shortMovies }) {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('search-value'));

  /*Функции изменения инпутов*/
  function handleSearchValueChange(e) {
    setSearchValue(e.target.value);
    //localStorage.setItem('')
  }

  /*функция саббмита формы поиска*/
  function handleSubmit(e) {
    e.preventDefault();
    localStorage.removeItem('search-movies');
    setSearchValue(searchValue);
    filter(searchValue);
    console.log(localStorage);
  }

  /*function onSubmitSavedMovies(data) {
    localStorage.removeItem('search-saved-movies');
    localStorage.setItem('search-value-saved', data.searchValue);
    filterSavedMovies(data.searchValue);
    localStorage.removeItem('search-saved-movies');
    //localStorage.removeItem('search-value-saved');
  }*/

  return (
    <section className="search-form">
      <div className="search-form__container">
        <img className="search-form__loupe" src={loupe} alt="Лупа" />
        <form className="search-form__form" onSubmit={handleSubmit}>
          <input
            className="search-form__input"
            type="search"
            placeholder="Фильм"
            minLength="3"
            required
            onChange={handleSearchValueChange}
            value={searchValue}
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
