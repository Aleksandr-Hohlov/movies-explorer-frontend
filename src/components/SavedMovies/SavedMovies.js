import React from 'react';
import './SavedMovies.css';
import Header from '../Movies/Header/Header';
import Footer from '../Main/Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <div className="saved-movies__page">
      <Header />
      <main className="saved-movies__content">
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </div>
  );
}
export default SavedMovies;
