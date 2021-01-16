import React, { Component } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./NotExistPage.css";
import "./NotExistPageResponsive.css";
import NoBeeIcon from "../../Assets/no-bee.svg";

class NotExistPage extends Component {
  constructor() {
    super();

    this.state = {
      burger_state: true,
    };
  }

  burgerMenuOptionClicked = () => {
    if (!this.state.burger_state) {
      const burger_menu = document.getElementsByClassName(
        "hamburger--stand"
      )[0];
      const nav_bar = document.getElementsByClassName("nav-bar")[0];

      const { burger_state } = this.state;

      burger_menu.classList.toggle("is-active");
      nav_bar.classList.toggle("on");

      this.setState({ burger_state: !burger_state });
    }
  };

  changeMenuState = () => {
    const burger_menu = document.getElementsByClassName("hamburger--stand")[0];
    const nav_bar = document.getElementsByClassName("nav-bar")[0];

    const { burger_state } = this.state;

    burger_menu.classList.toggle("is-active", burger_state);
    nav_bar.classList.toggle("on");

    this.setState({ burger_state: !burger_state });
  };

  render() {
    return (
      <div className="App">
        <header>
          <NavBar
            burgerMenuOptionClicked={this.burgerMenuOptionClicked}
            changeMenuState={this.changeMenuState}
          />
        </header>

        <main className="nopage-main">
          <p className="bee-p">
            <img alt="" src={NoBeeIcon}></img>
            <p>{"Your bees won't work here :("}</p>
          </p>

          <p>
            {
              "You are trying to access a page that doesn't exist on our website"
            }
          </p>

          <p>
            {"Try to access one of the above menus on the upper navigation bar"}
          </p>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default NotExistPage;
