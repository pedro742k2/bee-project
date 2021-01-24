import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/* Pages */
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contacts from "./Pages/Contacts/Contacts";
import MainLogin from "./Pages/MainLogin/MainLogin";
import Apiary from "./Pages/Apiary/Apiary";
import NotExistPage from "./Pages/NotExistPage/NotExistPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/login" component={MainLogin} />
        <Route path="/apiary" component={Apiary} />
        <Route path="/" component={NotExistPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
