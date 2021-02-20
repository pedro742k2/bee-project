import React, { Component } from "react";
import NotCorrect from "../../../Assets/error.svg";
import refresh from "../../../Assets/refresh_colorful.svg";

class Register extends Component {
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
          </div>

          <div className="input-container">
            <input
              id="register-email-input"
              className="user-input"
              type="email"
              placeholder="Email"
            ></input>
          </div>

          <div className="input-container">
            <input
              id="register-pwrd-input"
              className="user-input"
              type="password"
              placeholder="Password"
            ></input>
          </div>

          <div className="input-container">
            <input
              id="register-secondPwrd-input"
              className="user-input"
              type="password"
              placeholder="Repeat password"
            ></input>
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
