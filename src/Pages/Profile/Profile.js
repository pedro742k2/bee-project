import React, { Component } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./Profile.css";
import "./ProfileResponsive.css";

class Profile extends Component {
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
    const { token } = this.props;
    return (
      <div className="App">
        <header>
          <NavBar changeMenuState={this.changeMenuState} />
        </header>

        <main className="profile-main">
          <div className="user-info-container">
            {token.name === null ? (
              <h1>Hi, we see that you haven't set a name yet</h1>
            ) : (
              <h1>Hi, {token.name}</h1>
            )}

            <h2>User info:</h2>
            <p>Username: {token.userName}</p>
            <p>Email: {token.email}</p>

            <button onClick={this.props.logOut} className="logout-btn">
              Log out
            </button>
          </div>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default Profile;

/* const Profile = ({ token }) => {
  return (
    <div>
      {token.name === null ? (
        <h1>Hi, we see that you haven't set a name yet</h1>
      ) : (
        <h1>Hi, {token.name}</h1>
      )}

      <h2>User info:</h2>
      <p>Username: {token.userName}</p>
      <p>Email: {token.email}</p>
    </div>
  );
}; 

export default Profile; */
