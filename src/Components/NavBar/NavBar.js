import React, { useState, useEffect } from "react";
import "./NavBar.css";
import "./NavBarResponsive.css";
import "./burger-menu/hamburgers.min.css";
import bee from "../../Assets/bee.svg";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ changeMenuState }) => {
  const path = useLocation().pathname;
  const userToken = JSON.parse(localStorage.getItem("token"));

  const [logedIn, setLogedIn] = useState(false);

  const changeOptionsState = () => {
    document.getElementById("/")?.classList.remove("disabled");
    document.getElementById("/about")?.classList.remove("disabled");
    document.getElementById("/contacts")?.classList.remove("disabled");
    document.getElementById("/apiary")?.classList.remove("disabled");
    document.getElementById("/login")?.classList.remove("disabled");
    document.getElementById("/profile")?.classList.remove("disabled");

    document.getElementById(path)?.classList.add("disabled");

    if ((userToken?.userName?.length >= 1, userToken?.email?.length >= 1)) {
      setLogedIn(true);
    } else {
      setLogedIn(false);
    }
  };

  useEffect(() => {
    changeOptionsState();

    window.addEventListener("storage", changeOptionsState);
    return () => {
      window.removeEventListener("storage", changeOptionsState);
    };
  }, [path, logedIn]);

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

        <Link className="links" to="/">
          <p id="/">Home</p>
        </Link>

        <Link className="links" to="/about">
          <p id="/about">About</p>
        </Link>

        <Link className="links" to="/contacts">
          <p id="/contacts">Contacts</p>
        </Link>

        <Link className="links" to="/apiary">
          <p id="/apiary">Apiary</p>
        </Link>

        {!logedIn ? (
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
