import React from 'react';
import loupe from '../../../images/search-icon.svg';
import './SearchForm.css';
import ToggleSwitch from '../../../utils/ToggleSwitch/ToggleSwitch';

function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <div className="search-form__container-element">
          <img className="search-form__loupe" src={loupe} alt="Лупа" />
          <form className="search-form__form">
            <input className="search-form__input" type="search" placeholder="Фильм" minLength="3" required></input>
            <button className="search-form__submit-btn" type="submit">
              Найти
            </button>
          </form>
        </div>

        <div className="search-form__toggle-switch">
          <ToggleSwitch />
          <span className="search-form__shot-movie">Короткометражки</span>
        </div>
      </div>

      <div className="search-form__border-bottom"></div>
    </section>
  );
}

export default SearchForm;
