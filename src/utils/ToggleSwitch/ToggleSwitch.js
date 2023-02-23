import React from 'react';
import './ToggleSwitch.css';

function ToggleSwitch({ handleShortFilms, shortMovies, isValid }) {
  return (
    <label className="switch">
      <input type="checkbox" onChange={handleShortFilms} checked={shortMovies ? true : false}></input>
      <span className="slider round"></span>
    </label>
  );
}

export default ToggleSwitch;
