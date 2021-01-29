import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

/* Pages */
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contacts from "./Pages/Contacts/Contacts";
import MainLogin from "./Pages/MainLogin/MainLogin";
import Apiary from "./Pages/Apiary/Apiary";
import NotExistPage from "./Pages/NotExistPage/NotExistPage";
import Profile from "./Pages/Profile/Profile";

const Routes = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [localStored, setLocalStorage] = useState(undefined);

  const setLoginToken = (checkboxState = false, user) => {
    try {
      const verifyLength = user.userName.length >= 1;

      if (verifyLength && checkboxState) {
        localStorage.setItem("token", JSON.stringify(user));
        sessionStorage.setItem("isLogged", "true");
        setLoggedIn(true);
        setToken(user);
        setLocalStorage(true);
      } else if (verifyLength && !checkboxState) {
        sessionStorage.setItem("token", JSON.stringify(user));
        setLoggedIn(true);
        setToken(user);
        setLocalStorage(false);
        sessionStorage.setItem("isLogged", "true");
      }
    } catch {
      setLoggedIn(false);
      sessionStorage.setItem("isLogged", "false");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    sessionStorage.setItem("isLogged", "false");
    setLoggedIn(false);
    setLocalStorage(undefined);
  };

  useEffect(() => {
    const userToken =
      JSON.parse(localStorage.getItem("token")) ||
      JSON.parse(sessionStorage.getItem("token"));

    if (userToken) {
      const checkLocalStorage = JSON.parse(localStorage.getItem("token"));
      if (checkLocalStorage === null) {
        setLocalStorage(false);
      } else {
        setLocalStorage(true);
      }
      setLoggedIn(true);
      setToken(userToken);
      sessionStorage.setItem("isLogged", "true");
    }
  }, [loggedIn]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/apiary" component={Apiary} />
        <Route path="/profile">
          <Profile
            localStored={localStored}
            loggedIn={loggedIn}
            setLoginToken={setLoginToken}
            token={token}
            logOut={logOut}
          />
        </Route>

        {!loggedIn ? (
          <Route path="/login">
            <MainLogin loggedIn={loggedIn} setLoginToken={setLoginToken} />
          </Route>
        ) : (
          <Redirect
            to={{
              pathname: "/profile",
            }}
          />
        )}

        <Route path="/" component={NotExistPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
