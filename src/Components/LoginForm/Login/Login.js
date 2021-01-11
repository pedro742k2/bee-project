import React, { Component } from "react";
import NotCorrect from "../../../Assets/error.svg";

class Login extends Component {
  componentWillUnmount() {
    document
      .getElementsByClassName("error-box user_email")[0]
      .classList.remove("active");

    document
      .getElementsByClassName("error-box pwrd")[0]
      .classList.remove("active");

    this.props.resetState();
  }

  render() {
    return (
      <div className="inputs-div">
        <div className="input-fields">
          <div className="input-container">
            <input
              id="login-user-input"
              className="user-input"
              type="text"
              placeholder="Email or username"
            ></input>
            <img
              alt=""
              onClick={() => {
                this.props.mouseOverError("error-box user_email");
              }}
              onMouseOver={() => {
                this.props.mouseOverError("error-box user_email");
              }}
              id="login-user-error"
              src={NotCorrect}
            ></img>
          </div>

          <div className="input-container">
            <input
              id="login-pwrd-input"
              className="user-input"
              type="password"
              placeholder="Password"
            ></input>
            <img
              alt=""
              onClick={() => {
                this.props.mouseOverError("error-box pwrd");
              }}
              onMouseOver={() => {
                this.props.mouseOverError("error-box pwrd");
              }}
              id="login-pwrd-error"
              src={NotCorrect}
            ></img>
          </div>
        </div>

        <button
          onClick={this.props.checkLoginInputs}
          className="submit-form-btn"
        >
          <span>LOGIN</span>
        </button>
      </div>
    );
  }
}

export default Login;
