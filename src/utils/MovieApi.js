class MovieApi {
  constructor({ url }) {
    this._url = url;
  }
  _checkResult(result) {
    if (result.ok) return result.json();
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((result) => this._checkResult(result));
  }
}

export const movieApi = new MovieApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
});
