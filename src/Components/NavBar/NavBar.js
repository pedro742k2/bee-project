import React, { useState, useEffect } from "react";
import "./NavBar.css";
import "./NavBarResponsive.css";
import "./burger-menu/hamburgers.min.css";
import bee from "../../Assets/bee.svg";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ changeMenuState }) => {
  const path = useLocation().pathname;
  const userToken =
    JSON.parse(localStorage.getItem("token")) ||
    JSON.parse(sessionStorage.getItem("token"));

  const isLogged = JSON.parse(sessionStorage.getItem("isLogged"));

  const [loggedIn, setLoggedIn] = useState(false);

  const changeOptionsState = () => {
    document.getElementById("/")?.classList.remove("disabled");
    document.getElementById("/about")?.classList.remove("disabled");
    document.getElementById("/contacts")?.classList.remove("disabled");
    document.getElementById("/apiary")?.classList.remove("disabled");
    document.getElementById("/login")?.classList.remove("disabled");
    document.getElementById("/profile")?.classList.remove("disabled");

    document.getElementById(path)?.classList.add("disabled");

    const token = userToken?.token;

    if (token && isLogged) return setLoggedIn(true);

    return setLoggedIn(false);
  };

  useEffect(() => {
    changeOptionsState();

    window.addEventListener("storage", changeOptionsState);
    return () => {
      window.removeEventListener("storage", changeOptionsState);
    };
  }, [path, loggedIn, isLogged]);

  const btnOptions = {
    name: ["Home", "About", "Contacts", "Hives"],
    links: ["/", "/about", "/contacts", "/apiary"],
  };

  return (
    <div className="nav-bar">
      <Link className="links" to="/">
        <img alt="bee-logo" className="bee-logo" src={bee}></img>
      </Link>

      <div className="nav-options">
        <div onClick={changeMenuState} className="burger-menu">
          <button className="hamburger hamburger--stand" type="button">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>

        {btnOptions.name.map((value, index) => {
          return (
            <Link key={index} className="links" to={btnOptions.links[index]}>
              <p id={btnOptions.links[index]}>{value}</p>
            </Link>
          );
        })}

        {!loggedIn ? (
          <Link className="links" to="/login">
            <p id="/login">Login</p>
          </Link>
        ) : (
          <Link className="links" to="/profile">
            <p id="/profile">Profile</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
