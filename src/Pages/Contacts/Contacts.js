import React, { Component } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./Contacts.css";
import "./ContactsResponsive.css";

class Contacts extends Component {
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

        <main className="contactspage-main">
          <p>Contacts Page</p>
          <p>Under development</p>
          <div className="contact-info">
            <p>
              If you wish to contact us to submit a question, report a bug or
              make a suggestion, please feel free to send an email
            </p>
            <p>
              <span>
                <b>Technical:</b> pmpb742k2@gmail.com
              </span>
              <span>
                <b>Project related:</b> paulo.torres@ipcb.pt
              </span>
            </p>
          </div>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default Contacts;
