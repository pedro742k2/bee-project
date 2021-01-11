import React, { useEffect } from "react";
import "./NavBar.css";
import "./burger-menu/hamburgers.min.css";
import bee from "../../Assets/bee.svg";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ burgerMenuOptionClicked, changeMenuState }) => {
  const path = useLocation().pathname;

  useEffect(() => {
    document.getElementById("/").classList.remove("disabled");
    document.getElementById("/about").classList.remove("disabled");
    document.getElementById("/contacts").classList.remove("disabled");
    document.getElementById("/apiary").classList.remove("disabled");
    document.getElementById("/login").classList.remove("disabled");
    document.getElementById(path).classList.add("disabled");
  });

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
          <p id="/" onClick={burgerMenuOptionClicked}>
            Home
          </p>
        </Link>

        <Link className="links" to="/about">
          <p id="/about" onClick={burgerMenuOptionClicked}>
            About
          </p>
        </Link>

        <Link className="links" to="/contacts">
          <p id="/contacts" onClick={burgerMenuOptionClicked}>
            Contacts
          </p>
        </Link>

        <Link className="links" to="/apiary">
          <p id="/apiary" onClick={burgerMenuOptionClicked}>
            Apiary
          </p>
        </Link>

        <hr id="hr-login"></hr>

        <Link className="links" to="/login">
          <p id="/login" onClick={burgerMenuOptionClicked}>
            Login
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
