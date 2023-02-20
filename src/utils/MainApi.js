class MainApi {
  constructor({ url }) {
    this._url = url;
  }

  /*проверка ответа сервера*/
  _checkResponse(response) {
    if (response.ok) return response.json();
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  /* получение информации о пользователе с сервера */
  getUserInfo() {
    //console.log(localStorage.jwt);
    //console.log(localStorage.token);
    //console.log(localStorage.token === localStorage.jwt);
    return fetch(`${this._url}/users/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      //console.log(res);
      return this._checkResponse(res);
    });
  }

  /* редактирование профиля */
  patchUserInfo(data) {
    //console.log(data);
    return fetch(`${this._url}/users/users/me`, {
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
    }).then((res) => {
      //console.log(res);
      return this._checkResponse(res);
    });
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

  /* регистрация на серевер */
  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    }).then((response) => this._checkResponse(response));
  }

  /* авторизация на сервере*/
  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    }).then((response) => this._checkResponse(response));
  }
}

export const mainApi = new MainApi({
  url: 'https://api.movies-Hohlov.nomoredomains.club',
});

/*
/* регистрация
register(name, email, password) {
  return fetch(`${this._url}/signup`, {
    method: 'POST',
    //credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then((response) => this._handleResponse(response));
}

/* авторизация
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

/* получение контента после авторизации
getMovies(jwt) {
  return fetch(`${this._url}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}


*/
