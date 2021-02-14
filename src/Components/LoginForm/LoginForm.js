import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import "./LoginFormResponsive.css";
import loginIcon from "../../Assets/login.svg";
import registerIcon from "../../Assets/register.svg";
/* Components */
import Login from "./Login/Login";
import Register from "./Register/Register";
import SubmitErrors from "./SubmitErrors/SubmitErrors";

const LoginForm = ({
  setLoginToken,
  disableAllErrorBoxes,
  onLoginPage,
  changeLoginPage,
}) => {
  const [checkboxState, setCheckboxState] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [signedUser, setSignedUser] = useState({});
  const [pending, setPending] = useState(false);

  const [loginFields, setLoginFields] = useState({
    ready: false,
    user: "",
    pwrd: "",
  });
  const [registerFields, setRegisterFields] = useState({
    ready: false,
    user: "",
    email: "",
    pwrd: "",
    secondPwrd: "",
  });

  const resetState = () => {
    setIsSignIn(false);
    setLoginFields({
      ready: false,
      user: "",
      pwrd: "",
    });

    setRegisterFields({
      ready: false,
      user: "",
      email: "",
      pwrd: "",
      secondPwrd: "",
    });
  };

  useEffect(() => {
    setLoginToken(checkboxState, signedUser);
  }, [checkboxState, signedUser]);

  const successSign = (user) => {
    const rememberUser = document.getElementById("remember-user-checkbox");

    setPending(false);
    setCheckboxState(rememberUser?.checked);
    setIsSignIn(true);
    setSignedUser(user);
  };

  const cancelPending = () => {
    return setPending(false);
  };

  const checkLoginInputs = () => {
    setPending(true);
    disableAllErrorBoxes();

    const user = document.getElementById("login-user-input").value;
    const pwrd = document.getElementById("login-pwrd-input").value;

    setLoginFields({
      ready: true,
      user,
      pwrd,
    });
  };

  const checkRegisterInputs = () => {
    setPending(true);
    disableAllErrorBoxes();
    const user = document.getElementById("register-user-input").value;
    const email = document.getElementById("register-email-input").value;
    const pwrd = document.getElementById("register-pwrd-input").value;
    const secondPwrd = document.getElementById("register-secondPwrd-input")
      .value;

    setRegisterFields({
      ready: true,
      user,
      email,
      pwrd,
      secondPwrd,
    });
  };

  const mouseOverError = (target) => {
    disableAllErrorBoxes();
    document.getElementsByClassName(target)[0].classList.add("active");
  };

  const specialOverErrors = (specialTarget) => {
    disableAllErrorBoxes();

    let emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    const email = registerFields.email;
    const pwrd = registerFields.pwrd;
    const secondPwrd = registerFields.secondPwrd;

    if (specialTarget === "email") {
      if (email === "") {
        document.getElementsByClassName("email")[0].classList.add("active");
      }

      if (!emailPattern.test(email) && email !== "") {
        document
          .getElementsByClassName("reg-invalid-email")[0]
          .classList.add("active");
      }
    }

    if (specialTarget === "reg_pwrd") {
      if (pwrd === "") {
        document
          .getElementsByClassName(specialTarget)[0]
          .classList.add("active");
      }
    }

    if (specialTarget === "secondPwrd") {
      if (secondPwrd === "") {
        document
          .getElementsByClassName(specialTarget)[0]
          .classList.add("active");
      }
    }

    if (specialTarget === "reg_pwrd" || specialTarget === "secondPwrd") {
      if (pwrd !== secondPwrd && pwrd !== "" && secondPwrd !== "") {
        document
          .getElementsByClassName("error-box repeated-pwrd")[0]
          .classList.add("active");
      }

      if (pwrd === secondPwrd && pwrd !== "" && pwrd.length < 8) {
        document
          .getElementsByClassName("error-box min-char-pwrd")[0]
          .classList.add("active");
      }
    }
  };

  return (
    <div className="main-div">
      <div style={{ animation: "fadeIn 0.5s ease-in" }} className="login-form">
        <div className="buttons-div">
          <button
            onClick={() => changeLoginPage("login-page")}
            className={onLoginPage ? "login-btn disable" : "login-btn enable"}
          >
            <div className="btn-text-div">
              <span>LOGIN</span>
              <div className="bubble"></div>
            </div>
            <img className="login-register-icon" src={loginIcon} alt=""></img>
          </button>
          <button
            onClick={() => changeLoginPage("register-page")}
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
          <Login
            pending={pending}
            mouseOverError={mouseOverError}
            checkLoginInputs={checkLoginInputs}
            resetState={resetState}
          />
        ) : (
          <Register
            pending={pending}
            mouseOverError={mouseOverError}
            specialOverErrors={specialOverErrors}
            checkRegisterInputs={checkRegisterInputs}
            resetState={resetState}
          />
        )}
      </div>
      <SubmitErrors
        cancelPending={cancelPending}
        isSignIn={isSignIn}
        login={loginFields}
        register={registerFields}
        successSign={successSign}
      />
    </div>
  );
};

export default LoginForm;
