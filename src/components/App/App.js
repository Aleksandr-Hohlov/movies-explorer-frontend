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
import ProtectedRoute from '../../utils/ProtectedRoute';
import Preloader from '../../utils/Preloader/Preloader';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [tokenChecked, setTokenChecked] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const [message, setMessage] = useState('');
  const [isActiveMessage, setIsActiveMessage] = useState(false);
  const [requestStatus, setRequestStatus] = useState(false);

  const history = useHistory();

  /*получаю информацию о профиле с сервера*/
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      mainApi
        .getUserInfo()
        .then((userInfoData) => {
          setLoggedIn(true);
          setCurrentUser(userInfoData.data);
          localStorage.setItem('user', userInfoData.data.email);
        })
        .catch((err) => {
          console.log(`Ошибка при получении данных о профиле (${err})`);
          alert(`Ошибка при получении данных о профиле (${err})`);
          setCurrentUser({});
        })
        .finally(() => {
          setTokenChecked(true);
        });
    } else {
      setTokenChecked(true);
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
        setMessage(`Ошибка при регистрации (${err})`);
        setIsActiveMessage(true);
        setRequestStatus(false);
        console.log(`Ошибка при регистрации (${err})`);
        // alert(`Ошибка при регистрации (${err})`);
      })
      .finally(() => {
        setTimeout(() => setIsActiveMessage(false), 3000);
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
        setMessage(`Ошибка при входе (${err})`);
        setIsActiveMessage(true);
        setRequestStatus(false);
        console.log(`Ошибка при входе (${err})`);
        // alert(`Ошибка при входе (${err})`);
      })
      .finally(() => {
        setTimeout(() => setIsActiveMessage(false), 3000);
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
    setCurrentUser({});
  }

  /*функция саббмита формы*/
  function handleProfileEdit(data) {
    setDisabledBtn(true);
    mainApi
      .patchUserInfo({
        name: data.name,
        email: data.email,
      })
      .then(() => {
        setSubmitSuccess(true);
      })
      .catch((err) => {
        setDisabledBtn(false);
        console.log(`Невозможно загрузить данные на сервер ${err}`);
        alert(`Невозможно загрузить данные на сервер (${err}`);
      })
      .finally(() => {
        setDisabledBtn(false);
        setTimeout(() => setSubmitSuccess(false), 1000);
      });

    setCurrentUser({ name: data.name, email: data.email, _id: currentUser._id });
  }

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
            <ProtectedRoute
              path="/profile"
              exact
              loggedIn={loggedIn}
              component={Profile}
              onLogOut={handleLogOut}
              onProfileEdit={handleProfileEdit}
              isSubmitSuccess={submitSuccess}
              disabledBtn={disabledBtn}
            />

            <ProtectedRoute
              path="/signin"
              exact
              loggedIn={!loggedIn}
              component={Login}
              handleLogin={handleLogin}
              isActiveMessage={isActiveMessage}
              message={message}
              requestStatus={requestStatus}
            />
            <ProtectedRoute
              path="/signup"
              exact
              loggedIn={!loggedIn}
              component={Register}
              handleRegister={handleRegister}
              isActiveMessage={isActiveMessage}
              message={message}
              requestStatus={requestStatus}
            />

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

/*

 <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>

            <Route path="/signup">
              <Register handleRegister={handleRegister} />
            </Route>


                       <ProtectedRoute path="/signin" exact loggedIn={!loggedIn} component={Login} handleLogin={handleLogin}/>
            <ProtectedRoute path="/signup" exact loggedIn={!loggedIn} component={Register} handleRegister={handleRegister}/>
*/
