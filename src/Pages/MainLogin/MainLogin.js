import React, { Component } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import LoginForm from "../../Components/LoginForm/LoginForm";
import Footer from "../../Components/Footer/Footer";

class MainLogin extends Component {
  constructor() {
    super();

    this.state = {
      onLoginPage: true,
      burger_state: true,
    };
  }

  disableAllErrorBoxes = () => {
    document
      .getElementsByClassName("error-box user_email")[0]
      .classList.remove("active");
    document
      .getElementsByClassName("error-box pwrd")[0]
      .classList.remove("active");

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
      .getElementsByClassName("error-box repeated-pwrd")[0]
      .classList.remove("active");
    document
      .getElementsByClassName("error-box reg-invalid-email")[0]
      .classList.remove("active");
    document
      .getElementsByClassName("error-box min-char-pwrd")[0]
      .classList.remove("active");
  };

  changeLoginPage = (route) => {
    route === "login-page"
      ? this.setState({ onLoginPage: true })
      : this.setState({ onLoginPage: false });

    const inputs = document.getElementsByClassName("user-input");

    for (let input of inputs) {
      input.value = "";
    }
  };

  changeMenuState = () => {
    this.disableAllErrorBoxes();
    const burger_menu = document.getElementsByClassName("hamburger--stand")[0];
    const nav_bar = document.getElementsByClassName("nav-bar")[0];
    const login_form = document.getElementsByClassName("login-form")[0];

    const { burger_state } = this.state;

    burger_menu.classList.toggle("is-active", burger_state);
    nav_bar.classList.toggle("on");
    login_form.classList.toggle("disable", burger_state);

    this.setState({ burger_state: !burger_state });
  };

  render() {
    const { onLoginPage } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <NavBar changeMenuState={this.changeMenuState} />
        </header>

        <main className="login-main">
          <LoginForm
            disableAllErrorBoxes={this.disableAllErrorBoxes}
            onLoginPage={onLoginPage}
            changeLoginPage={this.changeLoginPage}
          />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default MainLogin;
