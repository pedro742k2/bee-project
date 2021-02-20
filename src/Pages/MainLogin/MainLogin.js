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

  changeLoginPage = (route) => {
    route === "login-page"
      ? this.setState({ onLoginPage: true })
      : this.setState({ onLoginPage: false });

    // Get all page inputs ("Login" and "Register" page)
    const inputs = document.getElementsByClassName("user-input");

    // Clear input values on page change (Login <-> Register)
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
            onLoginPage={onLoginPage} // Always start on login page
            changeLoginPage={this.changeLoginPage} // To clear input values
            setLoginToken={this.props.setLoginToken}
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
