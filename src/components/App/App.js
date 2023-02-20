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
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();
  //const navigate = React.useNavigate();

  /*получаю информацию о профиле с сервера  d6221@yandex.ru d622q1@yandex.ru d1@yandex.ru*/
  useEffect(() => {
    //console.log(localStorage);
    if (localStorage.getItem('jwt')) {
      mainApi
        .getUserInfo()
        .then((userInfoObject) => {
          setLoggedIn(true);
          setCurrentUser(userInfoObject.data);
          localStorage.setItem('user', userInfoObject.data.email);
          //console.log(currentUser);
          //console.log(localStorage);
          // console.log(userInfoObject.data);
          //setLoggedIn(false);
          //console.log(loggedIn);
        })
        .catch((err) => {
          console.log(`Невозможно получить информацию о пользователе ${err}`);
        });
    }
  }, [localStorage.getItem('jwt')]);

  /* регистрация */
  function handleRegister(name, email, password) {
    localStorage.clear();
    return mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
        console.log(email);
        console.log(password);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(currentUser);

  /*функция  логина d6221@yandex.ru*/
  function handleLogin(email, password) {
    //console.log(localStorage);
    return mainApi
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          localStorage.setItem('login', true);
          console.log(localStorage);
          console.log(data);
          history.push('/movies');
          window.location.reload();
          //debugger;
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
