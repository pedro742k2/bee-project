import React, { Component } from "react";
import NotCorrect from "../../../Assets/error.svg";
import refresh from "../../../Assets/refresh_colorful.svg";

class Register extends Component {
  componentWillUnmount() {
    document
      .getElementsByClassName("error-box user")[0]
      .classList.remove("active");

    document
      .getElementsByClassName("error-box email")[0]
      .classList.remove("active");

    document
      .getElementsByClassName("error-box reg_pwrd")[0]
      .classList.remove("active");

    document
      .getElementsByClassName("error-box secondPwrd")[0]
      .classList.remove("active");

    document
      .getElementsByClassName("error-box reg-invalid-email")[0]
      .classList.remove("active");

    document
      .getElementsByClassName("error-box repeated-pwrd")[0]
      .classList.remove("active");

    document
      .getElementsByClassName("error-box min-char-pwrd")[0]
      .classList.remove("active");

    this.props.resetState();
  }

  render() {
    return (
      <div className="inputs-div">
        <div className="input-fields">
          <div className="input-container">
            <input
              id="register-user-input"
              className="user-input"
              type="text"
              placeholder="Username"
            ></input>
            <img
              onClick={() => {
                this.props.mouseOverError("error-box user");
              }}
              onMouseOver={() => {
                this.props.mouseOverError("error-box user");
              }}
              alt=""
              id="register-user-error"
              src={NotCorrect}
            ></img>
          </div>

          <div className="input-container">
            <input
              id="register-email-input"
              className="user-input"
              type="email"
              placeholder="Email"
            ></input>
            <img
              onClick={() => {
                this.props.specialOverErrors("email"); // error-box email
              }}
              onMouseOver={() => {
                this.props.specialOverErrors("email"); // error-box email
              }}
              alt=""
              id="register-email-error"
              src={NotCorrect}
            ></img>
          </div>

          <div className="input-container">
            <input
              id="register-pwrd-input"
              className="user-input"
              type="password"
              placeholder="Password"
            ></input>
            <img
              onClick={() => {
                this.props.specialOverErrors("reg_pwrd"); // error-box reg_pwrd
              }}
              onMouseOver={() => {
                this.props.specialOverErrors("reg_pwrd"); // error-box reg_pwrd
              }}
              alt=""
              id="register-pwrd-error"
              src={NotCorrect}
            ></img>
          </div>

          <div className="input-container">
            <input
              id="register-secondPwrd-input"
              className="user-input"
              type="password"
              placeholder="Repeat password"
            ></input>
            <img
              onClick={() => {
                this.props.specialOverErrors("secondPwrd"); // error-box secondPwrd
              }}
              onMouseOver={() => {
                this.props.specialOverErrors("secondPwrd"); // error-box secondPwrd
              }}
              alt=""
              id="register-secondPwrd-error"
              src={NotCorrect}
            ></img>
          </div>
        </div>
        <div className="btn-container">
          <button
            onClick={this.props.checkRegisterInputs}
            className="submit-form-btn"
          >
            <span>REGISTER</span>
          </button>
          {this.props.pending ? (
            <img alt="" className="rotating-refresh login" src={refresh}></img>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Register;
