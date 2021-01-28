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

  const setLoginToken = (checkboxState, user) => {
    try {
      const verifyLength = user.userName.length >= 1;

      if (verifyLength && checkboxState) {
        localStorage.setItem("token", JSON.stringify(user));
        setLoggedIn(true);
        console.log("Remember");
      } else if (verifyLength && !checkboxState) {
        sessionStorage.setItem("token", JSON.stringify(user));
        setLoggedIn(true);
        console.log("Don't remember");
      }
    } catch {
      setLoggedIn(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setLoggedIn(false);
  };

  useEffect(() => {
    const userToken =
      JSON.parse(localStorage.getItem("token")) ||
      JSON.parse(sessionStorage.getItem("token"));

    if (userToken) {
      setLoggedIn(true);
      setToken(userToken);
    }
  }, [loggedIn]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/apiary" component={Apiary} />

        {loggedIn ? (
          <Route path="/profile">
            <Profile token={token} logOut={logOut} />
          </Route>
        ) : (
          <Route path="/profile" component={NotExistPage} />
        )}

        {!loggedIn ? (
          <Route path="/login">
            <MainLogin setLoginToken={setLoginToken} />
          </Route>
        ) : (
          <Redirect
            to={{
              pathname: "/profile",
            }}
          />
        )}

        {/* Any other page */}
        <Route path="/" component={NotExistPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
