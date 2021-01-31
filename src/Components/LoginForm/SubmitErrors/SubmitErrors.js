import React, { Component } from "react";
import closeBtn from "../../../Assets/close.svg";
import "./SubmitErrors.css";
import "./SubmitErrorsResponsive.css";
import Fetch from "../../../Settings/Fetch";

class SubmitErrors extends Component {
  closeBox = (event) => {
    let target = "";
    try {
      if (event.target.id !== undefined) {
        target = event.target.id;
      } else {
        target = event;
      }
    } catch {
      target = event;
    }

    document
      .getElementsByClassName(`error-box ${target}`)[0]
      .classList.remove("active");
  };

  fetchLogin = (user, password) => {
    if (!this.props.isSignIn) {
      Fetch("/login", "post", {
        user: user,
        password: password,
      })
        .then((result) => {
          if (result === "Wrong credentials") {
            document
              .getElementsByClassName("credentials")[0]
              .classList.add("active");
          } else {
            this.closeBox("credentials");

            this.props.successSign(result);
          }
        })
        .catch(() => {
          document
            .getElementsByClassName("server-error")[0]
            ?.classList.add("active");
        });
    }
  };

  fetchRegister = (user, email, password) => {
    Fetch("/register", "post", {
      userName: user,
      email: email,
      password: password,
    })
      .then((result) => {
        if (result === "Something went wrong") {
          document
            .getElementsByClassName("already-created")[0]
            .classList.add("active");
        } else {
          this.closeBox("already-created");

          this.props.successSign({
            userName: result[0].user_name,
            email: result[0].email,
            ApHv: null,
            name: null,
          });
        }
      })
      .catch(() => {
        document
          .getElementsByClassName("server-error")[0]
          ?.classList.add("active");
      });
  };

  updateLoginErrors = (user, pwrd) => {
    try {
      let error = false;

      if (user === "") {
        error = true;
        document.getElementById("login-user-input").classList.add("error");
        document.getElementById("login-user-error").classList.add("active");
      } else {
        document.getElementById("login-user-input").classList.remove("error");
        document.getElementById("login-user-error").classList.remove("active");
      }

      if (pwrd === "") {
        error = true;
        document.getElementById("login-pwrd-input").classList.add("error");
        document.getElementById("login-pwrd-error").classList.add("active");
      } else {
        document.getElementById("login-pwrd-input").classList.remove("error");
        document.getElementById("login-pwrd-error").classList.remove("active");
      }

      if (!error) {
        this.fetchLogin(user, pwrd);
      } else {
        this.closeBox("credentials");
        this.closeBox("server-error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateRegisterErrors = (user, email, pwrd, secondPwrd) => {
    try {
      let error = false;
      let emailPattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      const userInput = document.getElementById("register-user-input");
      const userError = document.getElementById("register-user-error");
      const emailInput = document.getElementById("register-email-input");
      const emailError = document.getElementById("register-email-error");
      const pwrdInput = document.getElementById("register-pwrd-input");
      const pwrdError = document.getElementById("register-pwrd-error");
      const scndPwrdInput = document.getElementById(
        "register-secondPwrd-input"
      );
      const scndPwrdError = document.getElementById(
        "register-secondPwrd-error"
      );
      let emailErrorState = false;
      let pwrdErrorState = false;
      let scndPwrdErrorState = false;

      if (user === "") {
        error = true;
        userInput.classList.add("error");
        userError.classList.add("active");
      } else {
        userInput.classList.remove("error");
        userError.classList.remove("active");
      }

      if (email === "") {
        error = true;
        emailErrorState = true;
      }

      if (!emailPattern.test(email) && email !== "") {
        error = true;
        emailErrorState = true;
      }

      if (emailErrorState) {
        error = true;
        emailInput.classList.add("error");
        emailError.classList.add("active");
      } else {
        emailInput.classList.remove("error");
        emailError.classList.remove("active");
      }

      if (pwrd === "") {
        error = true;
        pwrdErrorState = true;
      }

      if (secondPwrd === "") {
        error = true;
        scndPwrdErrorState = true;
      }

      if (pwrd !== secondPwrd && pwrd !== "" && secondPwrd !== "") {
        error = true;
        pwrdErrorState = true;
        scndPwrdErrorState = true;
      }

      if (pwrd === secondPwrd && pwrd !== "" && pwrd.length < 8) {
        error = true;
        pwrdErrorState = true;
        scndPwrdErrorState = true;
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

      if (!error) {
        this.fetchRegister(user, email, pwrd);
      } else {
        this.closeBox("already-created");
        this.closeBox("server-error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate() {
    const { isSignIn, login, register } = this.props;

    if (!isSignIn) {
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
    }
  }

  render() {
    return (
      <div className="errorsContainer">
        <div className="error-box already-created">
          <p>Looks like you already have an account</p>
          <img
            alt=""
            id="already-created"
            src={closeBtn}
            onClick={this.closeBox}
          ></img>
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
