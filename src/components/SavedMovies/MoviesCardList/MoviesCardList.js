import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__elements">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </div>
      <button className="movies-card-list__more-btn movies-card-list__more-btn_hidden" type="button">
        Еще
      </button>
    </section>
  );
}

export default MoviesCardList;
