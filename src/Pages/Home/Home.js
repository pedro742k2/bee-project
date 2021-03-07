import React, { Component } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./Home.css";
import "./HomeResponsive.css";
class Home extends Component {
  constructor() {
    super();

    this.state = {
      burger_state: true,
    };
  }

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
          <NavBar changeMenuState={this.changeMenuState} />
        </header>

        <main className="homepage-main zoomIn_animation">
          <p>Home Page</p>
          <p>Under development</p>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default Home;
