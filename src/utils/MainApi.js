class MainApi {
  constructor({ url }) {
    this._url = url;
  }

  /*проверка ответа сервера*/
  _handleResponse(response) {
    if (response.ok) return response.json();
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  /* получение контента после авторизации */
  getMovies(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  }

  /* получение информации о пользователе с сервера */
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res));
  }

  /* редактирование профиля */
  patchUserInfo(data) {
    console.log(data);
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => this._checkResponse(res));
  }

  /* получение сохранненых фильмов */
  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res));
  }

  /* добавление фильма */
  saveMovie(movie) {
    console.log(movie);
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then((res) => this._checkResponse(res));
  }

  /* удаление фильма */
  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res));
  }

  /* регистрация */
  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    }).then((response) => this._handleResponse(response));
  }

  /* авторизация */
  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    }).then((response) => this._handleResponse(response));
  }
}

export const mainApi = new MainApi({
  url: 'http://api.movies-Hohlov.nomoredomains.club',
});
