import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom';
//import logo from '../../images/logo.svg';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../../utils/PageNotFound/PageNotFound';
//import * as auth from '../../utils/auth';
import { mainApi } from '../../utils/MainApi';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isDataSet, setIsDataSet] = React.useState(false);
  const history = useHistory();

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi
        .getMovies(token)
        .then((res) => {
          if (res) {
            //setUserData({ email: res.data.email });
            setLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [history, loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  /* регистрация */
  function handleRegister(name, email, password) {
    console.log(email, password, name);
    return mainApi
      .register(name, email, password)
      .then(() => {
        setIsDataSet(true);
        history.push('/sign-in');
        //setTooltipStatus(true);
      })
      .catch((err) => {
        setIsDataSet(false);
        // setTooltipStatus(false);
        //setIsInfoToolTipOpen(true);
      })
      .finally(() => {
        setIsDataSet(false);
        //setIsInfoToolTipOpen(true);
      });
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route path="/movies">
            <Movies />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/signin">
            <Login />
          </Route>

          <Route path="/signup">
            <Register handleRegister={handleRegister} isDataSet={isDataSet} />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
