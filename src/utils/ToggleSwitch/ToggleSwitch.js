import React from 'react';
import './ToggleSwitch.css';
import { useLocation } from 'react-router-dom';

function ToggleSwitch({ handleShortFilms, shortMovies }) {
  return (
    <label className="switch">
      <input type="checkbox" onChange={handleShortFilms} checked={shortMovies ? true : false}></input>
      <span className="slider round"></span>
    </label>
  );
}

export default ToggleSwitch;
