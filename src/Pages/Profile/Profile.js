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
  const [user, setUser] = useState();

  const changeMenuState = () => {
    const burger_menu = document.getElementsByClassName("hamburger--stand")[0];
    const nav_bar = document.getElementsByClassName("nav-bar")[0];

    burger_menu.classList.toggle("is-active", burgerState);
    nav_bar.classList.toggle("on");

    setBurgerState(!burgerState);
  };

  const setName = async () => {
    const newName = document.querySelector(".set-name input").value;

    const newUserData = await fetch(`${ServerApi}/set-name`, {
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
      .catch((error) => {
        return error;
      });

    if (newUserData === "Updated successfuly") {
      setLoginToken(localStored, {
        userName: token?.userName,
        email: token?.email,
        ApHv: token?.ApHv,
        name: newName,
      });

      setUser({
        userName: token?.userName,
        email: token?.email,
        name: newName,
        ApHv: token?.ApHv,
      });
    }
  };

  useEffect(() => {
    console.log("userEffect ->", token, user);
    setUser({
      userName: token?.userName,
      email: token?.email,
      name: token?.name,
      ApHv: token?.ApHv,
    });
  }, [token]);

  return (
    <div className="App">
      <header>
        <NavBar changeMenuState={changeMenuState} />
      </header>

      <main className="profile-main">
        {loggedIn ? (
          <div className="user-info-container">
            <h1>User info:</h1>

            {user?.name === null || user?.name?.length < 1 ? (
              <Fragment>
                <h2>Hi, we see that you haven't set a name yet</h2>

                <div className="set-name">
                  <span>Tell us your name: </span>
                  <input type="text"></input>
                  <button onClick={setName}>Submit</button>
                </div>
              </Fragment>
            ) : (
              <h2>Hi, {user?.name}</h2>
            )}

            <p>Username: {user?.userName}</p>
            <p>Email: {user?.email}</p>
            <p>
              Apiaries/Hives:{" "}
              {user?.ApHv ? user.ApHv : "No apiaries or hives added"}
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
