import React, { Component } from "react";
import "./LoginForm.css";
import "./LoginFormResponsive.css";
import loginIcon from "../../Assets/login.svg";
import registerIcon from "../../Assets/register.svg";
/* Components */
import Login from "./Login/Login";
import Register from "./Register/Register";
import SubmitErrors from "./SubmitErrors/SubmitErrors";
// import honey from "../../Assets/honey.svg";

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      loginFields: {
        ready: false,
        user: "",
        pwrd: "",
      },

      registerFields: {
        ready: false,
        user: "",
        email: "",
        pwrd: "",
        secondPwrd: "",
      },
    };

    this.baseState = this.state;
  }

  resetState = () => {
    this.setState(this.baseState);
  };

  checkLoginInputs = () => {
    this.props.disableAllErrorBoxes();
    const user = document.getElementById("login-user-input").value;
    const pwrd = document.getElementById("login-pwrd-input").value;

    this.setState({
      loginFields: {
        ready: true,
        user,
        pwrd,
      },
    });
  };

  checkRegisterInputs = () => {
    this.props.disableAllErrorBoxes();
    const user = document.getElementById("register-user-input").value;
    const email = document.getElementById("register-email-input").value;
    const pwrd = document.getElementById("register-pwrd-input").value;
    const secondPwrd = document.getElementById("register-secondPwrd-input")
      .value;

    this.setState({
      registerFields: {
        ready: true,
        user,
        email,
        pwrd,
        secondPwrd,
      },
    });
  };

  mouseOverError = (target) => {
    this.props.disableAllErrorBoxes();
    document.getElementsByClassName(target)[0].classList.add("active");
  };

  specialOverErrors = (specialTarget) => {
    this.props.disableAllErrorBoxes();

    /* EMAIL -> Empty |or| Invalid */
    /* Password -> Empty password |or| < 8 char |or| Not matching */
    /* Second Password -> Empty password |or| < 8 char |or| Not matching */

    let emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    const { email, pwrd, secondPwrd } = this.state.registerFields;

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

  render() {
    return (
      <div className="main-div">
        <div
          style={{ animation: "fadeIn 0.5s ease-in" }}
          className="login-form"
        >
          <div className="buttons-div">
            <button
              onClick={() => this.props.changeLoginPage("login-page")}
              className={
                this.props.onLoginPage
                  ? "login-btn disable"
                  : "login-btn enable"
              }
            >
              <div className="btn-text-div">
                <span>LOGIN</span>
                <div className="bubble"></div>
              </div>
              <img className="login-register-icon" src={loginIcon} alt=""></img>
            </button>
            <button
              onClick={() => this.props.changeLoginPage("register-page")}
              className={
                this.props.onLoginPage
                  ? "register-btn enable"
                  : "register-btn disable"
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

          {this.props.onLoginPage ? (
            <Login
              mouseOverError={this.mouseOverError}
              checkLoginInputs={this.checkLoginInputs}
              resetState={this.resetState}
            />
          ) : (
            <Register
              mouseOverError={this.mouseOverError}
              specialOverErrors={this.specialOverErrors}
              checkRegisterInputs={this.checkRegisterInputs}
              resetState={this.resetState}
            />
          )}
        </div>
        <SubmitErrors
          login={this.state.loginFields}
          register={this.state.registerFields}
        />
      </div>
    );
  }
}

export default LoginForm;
