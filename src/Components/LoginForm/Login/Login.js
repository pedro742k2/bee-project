import React, { Component } from "react";
import refresh from "../../../Assets/refresh_colorful.svg";

class Login extends Component {
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
          </div>

          <div className="input-container">
            <input
              id="login-pwrd-input"
              className="user-input"
              type="password"
              placeholder="Password"
            ></input>
          </div>

          <div id="remember-checkbox">
            <input id="remember-user-checkbox" type="checkbox"></input>
            <p>Remember me next time?</p>
          </div>
        </div>

        <div className="btn-container">
          <button
            onClick={this.props.checkLoginInputs}
            className="submit-form-btn"
          >
            <span>LOGIN</span>
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

export default Login;
