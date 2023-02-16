import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom';

//import logo from '../../images/logo.svg';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../../utils/PageNotFound/PageNotFound';
import * as auth from '../../utils/auth';
import { mainApi } from '../../utils/MainApi';
import { movieApi } from '../../utils/MovieApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isDataSet, setIsDataSet] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();

  /*получаю информацию о профиле с сервера  d6221@yandex.ru*/
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      mainApi
        .getUserInfo()
        .then((userInfoObject) => {
          setCurrentUser(userInfoObject);
          setLoggedIn(true);
          localStorage.setItem('user', userInfoObject.email);
          // navigate('/movies')
        })
        .catch((err) => {
          console.log(`Невозможно получить информацию о пользователе ${err}`);
        });
    }
  }, [localStorage.getItem('jwt')]);

  /* регистрация */
  function handleRegister(name, email, password) {
    return auth
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
        console.log(email);
        console.log(password);
        debugger;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /*функция  логина d6221@yandex.ru*/
  function handleLogin(email, password) {
    //console.log(localStorage);
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          localStorage.setItem('login', true);
          console.log(localStorage);
          console.log(data);
          window.location.reload();
          debugger;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <Route path="/movies">
              <Movies loggedIn={loggedIn} />
            </Route>

            <Route path="/saved-movies">
              <SavedMovies loggedIn={loggedIn} />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>

            <Route path="/signup">
              <Register handleRegister={handleRegister} />
            </Route>

            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
