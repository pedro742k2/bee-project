import React, { Component, Fragment } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./About.css";
import "./AboutResponsive.css";

class About extends Component {
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
    const { burger_state } = this.state;

    return (
      <div className="App">
        <header>
          <NavBar
            burgerMenuOptionClicked={this.burgerMenuOptionClicked}
            changeMenuState={this.changeMenuState}
          />
        </header>

        {burger_state ? (
          <Fragment>
            <main className="aboutpage-main">
              <p>About Page</p>
              <p>Under development</p>

              <div className="license-container">
                <span className="license-type">Copyright Notice</span>
                <hr></hr>
                <span align="justify" className="license">
                  MIT License
                  <br />
                  Copyright (c) 2021 Pedro Batista
                  <br />
                  <br />
                  Permission is hereby granted, free of charge, to any person
                  obtaining a copy of this software and associated documentation
                  files (the "Software"), to deal in the Software without
                  restriction, including without limitation the rights to use,
                  copy, modify, merge, publish, distribute, sublicense, and/or
                  sell copies of the Software, and to permit persons to whom the
                  Software is furnished to do so, subject to the following
                  conditions
                  <br />
                  <br /> The above copyright notice and this permission notice
                  shall be included in all copies or substantial portions of the
                  Software.
                  <br />
                  <br />
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
                  KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
                  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </span>
              </div>
            </main>

            <footer>
              <Footer />
            </footer>
          </Fragment>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default About;
