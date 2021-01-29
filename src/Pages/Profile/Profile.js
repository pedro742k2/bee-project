import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./Profile.css";
import "./ProfileResponsive.css";

import NoBeeIcon from "../../Assets/no-bee.svg";

const Profile = ({ loggedIn, token, logOut }) => {
  const [burgerState, setBurgerState] = useState(true);
  const [haveLoggedOut, setHaveLoggedOut] = useState(false);

  const changeMenuState = () => {
    const burger_menu = document.getElementsByClassName("hamburger--stand")[0];
    const nav_bar = document.getElementsByClassName("nav-bar")[0];

    burger_menu.classList.toggle("is-active", burgerState);
    nav_bar.classList.toggle("on");

    setBurgerState(!burgerState);
  };

  return (
    <div className="App">
      <header>
        <NavBar changeMenuState={changeMenuState} />
      </header>

      <main className="profile-main">
        {loggedIn ? (
          <div className="user-info-container">
            <h1>User info:</h1>

            {token?.name === null ? (
              <h2>Hi, we see that you haven't set a name yet</h2>
            ) : (
              <h2>Hi, {token?.name}</h2>
            )}
            {/* <div>
              <span>What's your name?</span>
            </div> */}
            <p>Username: {token?.userName}</p>
            <p>Email: {token?.email}</p>
            <p>
              Apiaries/Hives:{" "}
              {token?.ApHv ? token.ApHv : "No apiaries or hives added"}
            </p>

            <button
              onClick={() => {
                setHaveLoggedOut(true);
                logOut();
              }}
              className="logout-btn"
            >
              Log out
            </button>
          </div>
        ) : (
          <Fragment>
            {haveLoggedOut ? (
              <Fragment>
                <h1>Bye, hope you come back</h1>
                <p className="bee-p">
                  <img alt="" src={NoBeeIcon}></img>
                  <p>{"You logged out successfuly"}</p>
                </p>

                <p>
                  {"Your user data was deleted from the browser local storage"}
                </p>
              </Fragment>
            ) : (
              <Fragment>
                <h1>You may have to log in first</h1>
                <p className="bee-p">
                  <img alt="" src={NoBeeIcon}></img>
                  <p>{"You're not ready to access your profile :("}</p>
                </p>

                <p>{"To access this page, you may log in first"}</p>
              </Fragment>
            )}
          </Fragment>
        )}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Profile;
