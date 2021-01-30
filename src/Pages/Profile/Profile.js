import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./Profile.css";
import "./ProfileResponsive.css";
import ServerApi from "../../Settings/ServerApi";

import NoBeeIcon from "../../Assets/no-bee.svg";

const Profile = ({ loggedIn, setLoginToken, token, logOut, localStored }) => {
  const [burgerState, setBurgerState] = useState(true);
  const [haveLoggedOut, setHaveLoggedOut] = useState(false);
  const [updatedHives, setUpdatedHives] = useState(undefined);

  const getApHv = sessionStorage.getItem("ApHv");

  const changeMenuState = () => {
    const burger_menu = document.getElementsByClassName("hamburger--stand")[0];
    const nav_bar = document.getElementsByClassName("nav-bar")[0];

    burger_menu.classList.toggle("is-active", burgerState);
    nav_bar.classList.toggle("on");

    setBurgerState(!burgerState);
  };

  const setName = async () => {
    const newName = document.querySelector(".set-name input").value;

    const response = await fetch(`${ServerApi}/set-name`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: token?.userName,
        email: token?.email,
        name: newName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch(() => {
        return false;
      });

    if (response === "Updated successfuly") {
      setLoginToken(localStored, {
        userName: token?.userName,
        email: token?.email,
        ApHv: token?.ApHv,
        name: newName,
      });
    } else {
      alert(
        "We are sorry but there was a problem consulting our servers\nTry again later :("
      );
    }
  };

  useEffect(() => {
    if (getApHv.length >= 1) {
      setUpdatedHives(getApHv);
    } else {
      setUpdatedHives(token?.ApHv ? token.ApHv : "No apiaries or hives added");
    }
  }, [getApHv]);

  return (
    <div className="App">
      <header>
        <NavBar changeMenuState={changeMenuState} />
      </header>

      <main className="profile-main">
        {loggedIn ? (
          <div className="user-info-container">
            <h1>User info:</h1>

            {token?.name === null || token?.name?.length < 1 ? (
              <Fragment>
                <h2>Hi, we see that you haven't set a name yet</h2>

                <div className="set-name">
                  <span>Tell us your name: </span>
                  <input type="text"></input>
                  <button onClick={setName}>Submit</button>
                </div>
              </Fragment>
            ) : (
              <h2>Hi, {token?.name}</h2>
            )}

            <div className="user-info">
              <p>
                <b>Name:</b>
                <input value={token?.name} type="text"></input>
              </p>

              <p>
                <b>Username:</b>
                <input value={token?.userName} type="text"></input>
              </p>

              <p>
                <b>Email:</b>
                <input value={token?.email} type="text"></input>
              </p>

              <p>
                <b>Hives:</b> <input value={updatedHives} type="text"></input>
                {/* token?.ApHv ? token.ApHv : "No apiaries or hives added" */}
              </p>
            </div>

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
