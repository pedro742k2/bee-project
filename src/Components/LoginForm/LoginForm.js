import React, { useState, useEffect, Fragment } from "react";
import "./LoginForm.css";
import "./LoginFormResponsive.css";
import Fetch from "../../Settings/Fetch";
import loginIcon from "../../Assets/login.svg";
import registerIcon from "../../Assets/register.svg";
import errorIcon from "../../Assets/error.svg";
/* Components */
import Login from "./Login/Login";
import Register from "./Register/Register";

const LoginForm = ({ setLoginToken, onLoginPage, changeLoginPage }) => {
  const [checkboxState, setCheckboxState] = useState(false);
  const [actualError, setActualError] = useState(null);
  const [signedUser, setSignedUser] = useState({});
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setLoginToken(checkboxState, signedUser);
  }, [checkboxState, signedUser]);

  const successSign = (user) => {
    const rememberUser = document.getElementById("remember-user-checkbox");

    setPending(false);
    setCheckboxState(rememberUser?.checked);
    setSignedUser(user);
  };

  const checkLoginInputs = () => {
    setPending(true);

    Fetch("/login", "post", {
      user: document.getElementById("login-user-input").value,
      password: document.getElementById("login-pwrd-input").value,
    })
      .then((result) => {
        setPending(false);

        const { token } = result;

        if (token) return successSign(result);

        setActualError(result);
      })
      .catch(() => {
        setPending(false);
        alert(
          "Code 500 - Something went wrong...\nPlease contact us or try again later"
        );
      });
  };

  const checkRegisterInputs = () => {
    setPending(true);

    const password = document.getElementById("register-pwrd-input").value;
    const secondPassword = document.getElementById("register-secondPwrd-input")
      .value;

    if (password !== secondPassword) {
      setActualError("Passwords don't match");
      return setPending(false);
    }

    Fetch("/register", "post", {
      userName: document.getElementById("register-user-input").value,
      email: document.getElementById("register-email-input").value,
      password,
    })
      .then((result) => {
        setPending(false);

        const { token } = result;

        if (token) return successSign(result);

        setActualError(result);
      })
      .catch(() => {
        setPending(false);
        alert(
          "Code 500 - Something went wrong...\nPlease contact us or try again later"
        );
      });
  };

  return (
    <div className="main-div">
      <div style={{ animation: "fadeIn 0.5s ease-in" }} className="login-form">
        <div className="buttons-div">
          <button
            onClick={() => {
              setActualError(null);
              changeLoginPage("login-page");
            }}
            className={onLoginPage ? "login-btn disable" : "login-btn enable"}
          >
            <div className="btn-text-div">
              <span>LOGIN</span>
              <div className="bubble"></div>
            </div>
            <img className="login-register-icon" src={loginIcon} alt=""></img>
          </button>
          <button
            onClick={() => {
              setActualError(null);
              changeLoginPage("register-page");
            }}
            className={
              onLoginPage ? "register-btn enable" : "register-btn disable"
            }
          >
            <div className="btn-text-div">
              <span>REGISTER</span>
              <div className="bubble"></div>
            </div>
            <img
              className="login-register-icon"
              src={registerIcon}
              alt=""
            ></img>
          </button>
        </div>

        {onLoginPage ? (
          <Login pending={pending} checkLoginInputs={checkLoginInputs} />
        ) : (
          <Register
            pending={pending}
            checkRegisterInputs={checkRegisterInputs}
          />
        )}
      </div>

      {actualError !== null && actualError.length > 1 ? (
        <div className="actual-error-container">
          <span>{actualError}</span>
          <img alt="" src={errorIcon} onClick={() => setActualError(null)} />
        </div>
      ) : (
        <Fragment />
      )}
    </div>
  );
};

export default LoginForm;
