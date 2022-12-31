import React from 'react';
import './Movies.css';
import Header from './Header/Header';
import Footer from '../Main/Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <div className="movies">
      <Header />
      <main className="movies__content">
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </div>
  );
}
export default Movies;
