import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
//import logo from '../../images/logo.svg';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../../utils/PageNotFound/PageNotFound';

function App() {
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
            <Register />
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

/*
function App() {
  return (
    <div className="app">
      <Main />
      <Movies />
      <SavedMovies />
      <Profile />
      <Register />
      <Login />
      <Err404 />
    </div>
  );
}


*/
