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
  const [token, setToken] = useState();
  const [localStored, setLocalStorage] = useState(undefined);

  const setLoginToken = (checkboxState = true, user) => {
    const { token } = user;

    if (!token) return false;

    try {
      if (checkboxState) {
        localStorage.setItem("token", JSON.stringify(user));
        setLocalStorage(true);
      } else {
        sessionStorage.setItem("token", JSON.stringify(user));
        setLocalStorage(false);
      }

      setToken(user);

      sessionStorage.setItem("isLogged", "true");
      sessionStorage.setItem("hives_id", user?.hivesId);
    } catch {
      sessionStorage.setItem("isLogged", "false");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    sessionStorage.setItem("isLogged", "false");
    setLocalStorage(undefined);
    setToken(undefined);
  };

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("token")) ||
      JSON.parse(sessionStorage.getItem("token"));

    try {
      const { token } = user;

      if (!token) return false;

      const checkLocalStorage = JSON.parse(localStorage.getItem("token"));
      checkLocalStorage === null
        ? setLocalStorage(false)
        : setLocalStorage(true);

      setToken(user);
      sessionStorage.setItem("isLogged", "true");
    } catch {
      sessionStorage.setItem("isLogged", "false");
    }
  }, [sessionStorage.getItem("isLogged")]);

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
            setLoginToken={setLoginToken}
            token={token}
            logOut={logOut}
          />
        </Route>

        {!JSON.parse(sessionStorage.getItem("isLogged")) ? (
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

        <Route path="/" component={NotExistPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
