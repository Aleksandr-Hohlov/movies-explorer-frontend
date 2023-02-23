import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom';

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../../utils/PageNotFound/PageNotFound';
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute';
import Preloader from '../../utils/Preloader/Preloader';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [tokenChecked, setTokenChecked] = useState(false);

  const history = useHistory();

  // useEffect(() => {
  //   tokenCheck();
  // }, []);

  // function tokenCheck() {
  //   mainApi
  //     .getUserInfo()
  //     .then((userInfoData) => {
  //       setLoggedIn(true);
  //       setCurrentUser(userInfoData.data);
  //       localStorage.setItem('user', userInfoData.data.email);
  //       setTokenChecked(true);
  //       console.log(`tokenChecked = ${tokenChecked}`);
  //       console.log(`loggedIn = ${loggedIn}`);
  //     })
  //     .catch((err) => {
  //       //setLoggedIn(false);
  //       //setCurrentUser({});
  //       console.log(err);
  //     });
  // }

  /*получаю информацию о профиле с сервера*/
  useEffect(() => {
    console.log(localStorage);
    if (localStorage.getItem('jwt')) {
      mainApi
        .getUserInfo()
        .then((userInfoData) => {
          setLoggedIn(true);
          setCurrentUser(userInfoData.data);
          localStorage.setItem('user', userInfoData.data.email);
          // console.log(`tokenChecked = ${tokenChecked}`);
          // console.log(`loggedIn = ${loggedIn}`);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log(`tokenChecked = ${tokenChecked}`);
          setTokenChecked(true);
        });
    } else {
      setTokenChecked(true);
      console.log(`tokenChecked = ${tokenChecked}`);
    }
  }, [localStorage.getItem('jwt')]);

  function handleRegister(name, email, password) {
    return mainApi
      .register(name, email, password)
      .then(() => {
        localStorage.clear();
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    return mainApi
      .authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          localStorage.setItem('login', true);
          history.push('/movies');
          console.log(loggedIn);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // console.log(`Перед return tokenChecked = ${tokenChecked}`);
  // console.log(`Перед return loggedIn = ${loggedIn}`);

  if (!tokenChecked) {
    return (
      <>
        <Preloader />;
      </>
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <ProtectedRoute path="/movies" exact loggedIn={loggedIn} component={Movies} />
            <ProtectedRoute path="/saved-movies" exact loggedIn={loggedIn} component={SavedMovies} />
            <ProtectedRoute path="/profile" exact loggedIn={loggedIn} component={Profile} onLogOut={() => setLoggedIn(false)} />

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
