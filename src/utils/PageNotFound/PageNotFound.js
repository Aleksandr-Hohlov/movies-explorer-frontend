import React from 'react';
import './PageNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <main className="PageNotFound">
      <h1 className="PageNotFound__title">404</h1>
      <h2 className="PageNotFound__subtitle">Страница не найдена</h2>
      <Link className="PageNotFound__back" to="/">
        Назад
      </Link>
    </main>
  );
}

export default PageNotFound;
