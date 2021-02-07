import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./Profile.css";
import "./ProfileResponsive.css";
import Fetch from "../../Settings/Fetch";

import NoBeeIcon from "../../Assets/no-bee.svg";
import EditPencil from "../../Assets/pencil.svg";

const Profile = ({ loggedIn, setLoginToken, token, logOut, localStored }) => {
  const [burgerState, setBurgerState] = useState(true);
  const [haveLoggedOut, setHaveLoggedOut] = useState(false);
  const [updatedHives, setUpdatedHives] = useState(undefined);

  /* USER INFO */
  const [name, setName] = useState(token?.name);
  const [userName, setUserName] = useState(token?.userName);
  const [email, setEmail] = useState(token?.email);
  const [hives, setHives] = useState(token?.ApHv);

  const getApHv = sessionStorage.getItem("hives_id");

  const changeMenuState = () => {
    const burger_menu = document.getElementsByClassName("hamburger--stand")[0];
    const nav_bar = document.getElementsByClassName("nav-bar")[0];

    burger_menu.classList.toggle("is-active", burgerState);
    nav_bar.classList.toggle("on");

    setBurgerState(!burgerState);
  };

  const updateUserInfo = async (event) => {
    const id = event.target.id.split("-")[0];
    const { value } = document.getElementById(id);

    console.log(id, value);

    const response = await Fetch("/change-user-info", "put", {
      userName: token?.userName,
      email: token?.email,
      field: id,
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
        userName: response.user_name,
        email: response.email,
        ApHv: response.hives_id,
        name: response.name,
      });
    } else {
      alert(
        "We are sorry but there was a problem consulting our servers\nTry again later :("
      );
    }

    console.log(response);
  };

  useEffect(() => {
    if (
      getApHv === String(null) ||
      getApHv === String(undefined) ||
      getApHv === ""
    ) {
      setUpdatedHives(token?.ApHv ? token.ApHv : "No apiaries or hives added");
    } else {
      setUpdatedHives(getApHv);
    }
  }, [getApHv, name, userName, email, hives]);

  return (
    <div className="App">
      <header>
        <NavBar changeMenuState={changeMenuState} />
      </header>

      <main className="profile-main">
        {loggedIn ? (
          <div className="user-info-container">
            <h1>User stored information</h1>

            {token?.name === null || token?.name?.length < 1 ? (
              <Fragment>
                <h2>Hi, we see that you haven't set a name yet</h2>

                <div className="set-name">
                  <span>Tell us your name: </span>
                  <input id="empty-name-to-change" type="text"></input>
                  <button
                    onClick={updateUserInfo({
                      id: "name",
                      value: document.getElementById("empty-name-to-change")
                        .value,
                    })}
                  />
                </div>
              </Fragment>
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
                    type="text"
                  ></input>
                  <img
                    id="name-img"
                    alt=""
                    className="edit-field"
                    src={EditPencil}
                    onClick={updateUserInfo}
                  />
                </div>
              </p>

              <p>
                <b>Username</b>
                <div className="input-field">
                  <input
                    id="user_name"
                    className="profile-input"
                    defaultValue={token?.userName}
                    type="text"
                  ></input>
                  <img
                    id="user_name-img"
                    alt=""
                    className="edit-field"
                    src={EditPencil}
                    onClick={updateUserInfo}
                  />
                </div>
              </p>

              <p>
                <b>Email</b>
                <div className="input-field">
                  <input
                    id="email"
                    className="profile-input"
                    defaultValue={token?.email}
                    type="text"
                  ></input>
                  <img
                    id="email-img"
                    alt=""
                    className="edit-field"
                    src={EditPencil}
                    onClick={updateUserInfo}
                  />
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
