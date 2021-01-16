import React, { Component } from "react";
import closeBtn from "../../../Assets/close.svg";
import "./SubmitErrors.css";
import "./SubmitErrorsResponsive.css";

class SubmitErrors extends Component {
  closeBox = (event) => {
    const target = event.target.id;

    document
      .getElementsByClassName(`error-box ${target}`)[0]
      .classList.remove("active");
  };

  updateLoginErrors = (user, pwrd) => {
    /* 
    const userElement = document.getElementsByClassName(
      "error-box user_email"
    )[0];
    const pwrdElement = document.getElementsByClassName("error-box pwrd")[0]; */

    if (user === "") {
      // userElement.classList.add("active");
      document.getElementById("login-user-input").classList.add("error");
      document.getElementById("login-user-error").classList.add("active");
    } else {
      // userElement.classList.remove("active");
      document.getElementById("login-user-input").classList.remove("error");
      document.getElementById("login-user-error").classList.remove("active");
    }

    if (pwrd === "") {
      // pwrdElement.classList.add("active");
      document.getElementById("login-pwrd-input").classList.add("error");
      document.getElementById("login-pwrd-error").classList.add("active");
    } else {
      // pwrdElement.classList.remove("active");
      document.getElementById("login-pwrd-input").classList.remove("error");
      document.getElementById("login-pwrd-error").classList.remove("active");
    }

    /* ACTIVATE / REMOVE CREDENTIALS ERROR ... */
  };

  updateRegisterErrors = (user, email, pwrd, secondPwrd) => {
    /* const userElement = document.getElementsByClassName("error-box user")[0];
    const emailElement = document.getElementsByClassName("error-box email")[0];
    const pwrdElement = document.getElementsByClassName(
      "error-box reg_pwrd"
    )[0];
    const secondPwrdElement = document.getElementsByClassName(
      "error-box secondPwrd"
    )[0];
    const repeatedPwrd = document.getElementsByClassName(
      "error-box repeated-pwrd"
    )[0];
    const invalidEmail = document.getElementsByClassName(
      "error-box reg-invalid-email"
    )[0];
    const minLengthPwrd = document.getElementsByClassName(
      "error-box min-char-pwrd"
    )[0]; */

    let emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    const userInput = document.getElementById("register-user-input");
    const userError = document.getElementById("register-user-error");
    const emailInput = document.getElementById("register-email-input");
    const emailError = document.getElementById("register-email-error");
    const pwrdInput = document.getElementById("register-pwrd-input");
    const pwrdError = document.getElementById("register-pwrd-error");
    const scndPwrdInput = document.getElementById("register-secondPwrd-input");
    const scndPwrdError = document.getElementById("register-secondPwrd-error");
    let emailErrorState = false;
    let pwrdErrorState = false;
    let scndPwrdErrorState = false;

    if (user === "") {
      // userElement.classList.add("active");
      userInput.classList.add("error");
      userError.classList.add("active");
    } else {
      // userElement.classList.remove("active");
      userInput.classList.remove("error");
      userError.classList.remove("active");
    }

    if (email === "") {
      // emailElement.classList.add("active");
      emailErrorState = true;
    } else {
      // emailElement.classList.remove("active");
    }

    if (!emailPattern.test(email) && email !== "") {
      // invalidEmail.classList.add("active");
      emailErrorState = true;
    } else {
      // invalidEmail.classList.remove("active");
    }

    if (emailErrorState) {
      emailInput.classList.add("error");
      emailError.classList.add("active");
    } else {
      emailInput.classList.remove("error");
      emailError.classList.remove("active");
    }

    if (pwrd === "") {
      // pwrdElement.classList.add("active");
      pwrdErrorState = true;
    } else {
      // pwrdElement.classList.remove("active");
    }

    if (secondPwrd === "") {
      // secondPwrdElement.classList.add("active");
      scndPwrdErrorState = true;
    } else {
      // secondPwrdElement.classList.remove("active");
    }

    if (pwrd !== secondPwrd && pwrd !== "" && secondPwrd !== "") {
      // repeatedPwrd.classList.add("active");
      pwrdErrorState = true;
      scndPwrdErrorState = true;
    } else {
      // repeatedPwrd.classList.remove("active");
    }

    if (pwrd === secondPwrd && pwrd !== "" && pwrd.length < 8) {
      // minLengthPwrd.classList.add("active");
      pwrdErrorState = true;
      scndPwrdErrorState = true;
    } else {
      // minLengthPwrd.classList.remove("active");
    }

    if (pwrdErrorState) {
      pwrdInput.classList.add("error");
      pwrdError.classList.add("active");
    } else {
      pwrdInput.classList.remove("error");
      pwrdError.classList.remove("active");
    }

    if (scndPwrdErrorState) {
      scndPwrdInput.classList.add("error");
      scndPwrdError.classList.add("active");
    } else {
      scndPwrdInput.classList.remove("error");
      scndPwrdError.classList.remove("active");
    }
  };

  render() {
    const { login, register } = this.props;

    if (login.ready) {
      this.updateLoginErrors(login.user, login.pwrd);
    }
    if (register.ready) {
      this.updateRegisterErrors(
        register.user,
        register.email,
        register.pwrd,
        register.secondPwrd
      );
    }

    return (
      <div className="errorsContainer">
        <div className="error-box user_email">
          <p>Empty username / email field</p>
          <img
            alt=""
            id="user_email"
            src={closeBtn}
            onClick={this.closeBox}
          ></img>
        </div>

        <div className="error-box pwrd">
          <p>Empty password field</p>
          <img alt="" id="pwrd" src={closeBtn} onClick={this.closeBox}></img>
        </div>

        <div className="error-box credentials">
          <p>Wrong credentials</p>
          <img
            alt=""
            id="credentials"
            src={closeBtn}
            onClick={this.closeBox}
          ></img>
        </div>

        <div className="error-box server-error">
          <p>Server side error</p>
          <img
            alt=""
            id="server-error"
            src={closeBtn}
            onClick={this.closeBox}
          ></img>
        </div>

        <div className="error-box user">
          <p>Empty user field</p>
          <img alt="" id="user" src={closeBtn} onClick={this.closeBox}></img>
        </div>

        <div className="error-box email">
          <p>Empty email field</p>
          <img alt="" id="email" src={closeBtn} onClick={this.closeBox}></img>
        </div>

        <div className="error-box reg-invalid-email">
          <p>Invalid email</p>
          <img
            alt=""
            id="reg-invalid-email"
            src={closeBtn}
            onClick={this.closeBox}
          ></img>
        </div>

        <div className="error-box reg_pwrd">
          <p>Empty password field</p>
          <img
            alt=""
            id="reg_pwrd"
            src={closeBtn}
            onClick={this.closeBox}
          ></img>
        </div>

        <div className="error-box secondPwrd">
          <p>Empty repeat-password field</p>
          <img
            alt=""
            id="secondPwrd"
            src={closeBtn}
            onClick={this.closeBox}
          ></img>
        </div>

        <div className="error-box repeated-pwrd">
          <p>Passwords don't match</p>
          <img
            alt=""
            id="repeated-pwrd"
            src={closeBtn}
            onClick={this.closeBox}
          ></img>
        </div>

        <div className="error-box min-char-pwrd">
          <p>Password length is lower than 8 characters</p>
          <img
            alt=""
            id="min-char-pwrd"
            src={closeBtn}
            onClick={this.closeBox}
          ></img>
        </div>
      </div>
    );
  }
}

export default SubmitErrors;
