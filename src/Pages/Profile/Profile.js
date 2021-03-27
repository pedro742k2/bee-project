import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./Profile.css";
import "./ProfileResponsive.css";
import Fetch from "../../Settings/Fetch";

import NoBeeIcon from "../../Assets/no-bee.svg";
import SendChanges from "../../Assets/send-changes.svg";

const Profile = ({ setLoginToken, token, logOut, localStored }) => {
  const [burgerState, setBurgerState] = useState(true);
  const [haveLoggedOut, setHaveLoggedOut] = useState(false);
  const [updatedHives, setUpdatedHives] = useState(undefined);

  const [changedName, setChangedName] = useState(false);
  const [changedUserName, setChangedUserName] = useState(false);
  const [changedEmail, setChangedEmail] = useState(false);

  const getApHv = sessionStorage.getItem("hives_id");
  const loggedIn = JSON.parse(sessionStorage.getItem("isLogged"));

  const particlesState = localStorage.getItem("particlesState");

  const changeMenuState = () => {
    const burger_menu = document.getElementsByClassName("hamburger--stand")[0];
    const nav_bar = document.getElementsByClassName("nav-bar")[0];

    burger_menu.classList.toggle("is-active", burgerState);
    nav_bar.classList.toggle("on");

    setBurgerState(!burgerState);
  };

  const toggleParticles = () => {
    const disable = document
      .getElementById("tsparticles")
      .classList.toggle("disable");

    localStorage.setItem("particlesState", disable);

    window.location.reload();
  };

  const updateUserInfo = async (event) => {
    const id = event?.target?.id;

    if (!id) return false;

    let field = id.split("-")[0];

    const { value } = document.getElementById(field);

    const response = await Fetch("/change-user-info", "put", {
      userName: token?.userName,
      email: token?.email,
      field,
      value,
    })
      .then((data) => {
        return data;
      })
      .catch(() => {
        return false;
      });

    if (response !== "Error") {
      setLoginToken(localStored, {
        token: token?.token,
        userName: response.user_name,
        email: response.email,
        ApHv: response.hives_id,
        name: response.name,
      });
    } else {
      alert(
        "Something went wrong.\nProbably your input is already linked to another account"
      );
    }
  };

  const changedInputField = () => {
    document
      .getElementById("name")
      ?.value.trim()
      .replace(/\s{2,}/g, " ") !== token?.name
      ? setChangedName(true)
      : setChangedName(false);

    document
      .getElementById("user_name")
      ?.value.trim()
      .replace(/\s{2,}/g, " ") !== token?.userName
      ? setChangedUserName(true)
      : setChangedUserName(false);

    document
      .getElementById("email")
      ?.value.trim()
      .replace(/\s{2,}/g, " ") !== token?.email
      ? setChangedEmail(true)
      : setChangedEmail(false);
  };

  useEffect(() => {
    if (
      String(getApHv) == "null" ||
      String(getApHv) == "undefined" ||
      getApHv.length < 1
    ) {
      setUpdatedHives("No apiaries or hives added");
    } else {
      setUpdatedHives(getApHv);
    }

    changedInputField();
  }, [getApHv, token]);

  return (
    <div className="App">
      <header>
        <NavBar changeMenuState={changeMenuState} />
      </header>

      <main className="profile-main zoomIn_animation">
        {loggedIn ? (
          <div className="user-info-container">
            <h1>User profile</h1>

            {!token?.name || token?.name === null || token?.name?.length < 4 ? (
              <h2>Hi, we see that you haven't set a name yet</h2>
            ) : (
              <h2>Hi, {token?.name}</h2>
            )}

            <div className="user-info">
              <p>
                <b>Name</b>
                <div className="input-field">
                  <input
                    id="name"
                    className="profile-input"
                    defaultValue={token?.name}
                    onChange={changedInputField}
                    type="text"
                  ></input>
                  {changedName ? (
                    <img
                      id="name-img"
                      alt=""
                      className="edit-field"
                      src={SendChanges}
                      onClick={updateUserInfo}
                    />
                  ) : (
                    <Fragment />
                  )}
                </div>
              </p>

              <p>
                <b>Username</b>
                <div className="input-field">
                  <input
                    id="user_name"
                    className="profile-input"
                    defaultValue={token?.userName}
                    onChange={changedInputField}
                    type="text"
                  ></input>
                  {changedUserName ? (
                    <img
                      id="user_name-img"
                      alt=""
                      className="edit-field"
                      src={SendChanges}
                      onClick={updateUserInfo}
                    />
                  ) : (
                    <Fragment />
                  )}
                </div>
              </p>

              <p>
                <b>Email</b>
                <div className="input-field">
                  <input
                    id="email"
                    className="profile-input"
                    defaultValue={token?.email}
                    onChange={changedInputField}
                    type="text"
                  ></input>
                  {changedEmail ? (
                    <img
                      id="email-img"
                      alt=""
                      className="edit-field"
                      src={SendChanges}
                      onClick={updateUserInfo}
                    />
                  ) : (
                    <Fragment />
                  )}
                </div>
              </p>

              <p>
                <b>Hives ID</b>
                <div className="input-field">
                  <input
                    className="profile-input"
                    value={updatedHives}
                    type="text"
                  ></input>
                </div>
              </p>
            </div>

            <div className="rm-particles-container">
              <button className="rm-particles-btn" onClick={toggleParticles}>
                {particlesState === "true"
                  ? "Enable particles"
                  : "Disable Particles"}
              </button>
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
          </div>
        ) : (
          /* NOT LOGGED IN */
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
