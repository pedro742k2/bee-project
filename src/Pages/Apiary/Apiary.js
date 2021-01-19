import React, { Component, Fragment } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import ApiaryMenu from "../../Components/ApiaryMenu/ApiaryMenu";
import ActualValues from "../../Components/ActualValues/ActualValues";
import Chart from "../../Components/Chart/Chart";
import "./Apiary.css";
import "./ApiaryResponsive.css";

class Apiary extends Component {
  constructor() {
    super();

    this.state = {
      burger_state: true,

      date: {
        day: "",
        month: "",
        year: "",
      },

      measurementType: "Daily",
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

  componentDidMount() {
    let day = new Date();

    this.setState({
      date: {
        day: day.getDate(),
        month: day.getMonth() + 1,
        year: day.getFullYear(),
      },
    });
  }

  toggleDropMenu = () => {
    document
      .getElementsByClassName("custom-select")[0]
      .classList.toggle("open");
  };

  handleDropMenuClick = (item) => {
    this.setState({
      measurementType: item,
    });

    for (let i = 0; i < 3; i++) {
      document
        .getElementsByClassName("custom-option")
        [i].classList.remove("selected");
    }

    document.getElementsByClassName(item)[0].classList.add("selected");
  };

  render() {
    let { day, month, year } = this.state.date;
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
            <main className="apiarypage-main">
              {/* Left-side menu */}
              <div className="menus">
                <ApiaryMenu />
              </div>

              <div className="graphs">
                <div id="actual-values">
                  <h1>Actual values</h1>
                  <ActualValues />
                </div>
                <div id="charts">
                  {/* <h1>Apiary 3 - Hive 2</h1> */}
                  {/* <h1 id="measurement-date">Daily measurement</h1> */}
                  <div
                    className="custom-select-wrapper"
                    onClick={this.toggleDropMenu}
                  >
                    <div className="custom-select">
                      <div className="custom-select__trigger">
                        <span>{this.state.measurementType} measurements</span>
                        <div className="arrow"></div>
                      </div>
                      <div className="custom-options">
                        <span
                          className="custom-option Daily selected"
                          data-value="daily"
                          onClick={() => {
                            this.handleDropMenuClick("Daily");
                          }}
                        >
                          Daily measurements
                        </span>
                        <span
                          className="custom-option Weekly"
                          data-value="weekly"
                          onClick={() => {
                            this.handleDropMenuClick("Weekly");
                          }}
                        >
                          Weekly measurements
                        </span>
                        <span
                          className="custom-option Monthly"
                          data-value="monthly"
                          onClick={() => {
                            this.handleDropMenuClick("Monthly");
                          }}
                        >
                          Monthly measurements
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3>{`${day <= 9 ? "0" + day : day}/${
                    month <= 9 ? "0" + month : month
                  }/${year}`}</h3>

                  <Chart />
                </div>
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

export default Apiary;
