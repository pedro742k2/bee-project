import React, { useState, useEffect, Fragment } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import ApiaryMenu from "../../Components/ApiaryMenu/ApiaryMenu";
import ActualValues from "../../Components/ActualValues/ActualValues";
import Chart from "../../Components/Chart/Chart";
import "./Apiary.css";
import "./ApiaryResponsive.css";

const Apiary = () => {
  const [burgerState, setBurgerState] = useState(true);
  const [measurementType, setMeasurementType] = useState("Daily");

  const [allValues, setAllValues] = useState(undefined);
  const [actualValues, setActualValues] = useState(["-", "-", "-", "-"]);
  const [readOn, setReadOn] = useState("Not available yet");
  const [receivedOn, setReceivedOn] = useState("Not available yet");

  const getValues = async () => {
    const data = await fetch(
      "https://bee-project-server.herokuapp.com/get-data"
    )
      .then((res) => res.json())
      .then((data) => {
        const length = data.length;

        return [data, data[length - 1].data, data[length - 1].readDate];
      })
      .catch(() => {
        return false;
      });

    if (data) {
      setAllValues(data[0]); // All data
      setActualValues(data[1].split("-")); // 24-7-30-97

      const finalReadOn = data[2].split("-");
      setReadOn(
        `${
          finalReadOn[0].length === 1 ? "0" + finalReadOn[0] : finalReadOn[0]
        }/${
          finalReadOn[1].length === 1
            ? "0" + finalReadOn[1]
            : finalReadOn[1] + 1
        }/${finalReadOn[2]} - ${
          finalReadOn[3].length === 1 ? "0" + finalReadOn[3] : finalReadOn[3]
        }:${
          finalReadOn[4].length === 1 ? "0" + finalReadOn[4] : finalReadOn[4]
        }`
      );

      const now = new Date();
      setReceivedOn(
        `${
          now.getDate().toString().length === 1
            ? "0" + now.getDate()
            : now.getDate()
        }/${
          now.getMonth().toString().length === 1
            ? "0" + (now.getMonth() + 1)
            : now.getMonth() + 1
        }/${now.getFullYear()} - ${
          now.getHours().toString().length === 1
            ? "0" + now.getHours()
            : now.getHours()
        }:${
          now.getMinutes().toString().length === 1
            ? "0" + now.getMinutes()
            : now.getMinutes()
        }`
      );
    }
  };

  useEffect(() => {
    getValues();

    const interval = setInterval(() => {
      getValues();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const burgerMenuOptionClicked = () => {
    if (!burgerState) {
      const burger_menu = document.getElementsByClassName(
        "hamburger--stand"
      )[0];
      const nav_bar = document.getElementsByClassName("nav-bar")[0];

      burger_menu.classList.toggle("is-active");
      nav_bar.classList.toggle("on");

      setBurgerState(!burgerState);
    }
  };

  const changeMenuState = () => {
    const burger_menu = document.getElementsByClassName("hamburger--stand")[0];
    const nav_bar = document.getElementsByClassName("nav-bar")[0];

    burger_menu.classList.toggle("is-active", burgerState);
    nav_bar.classList.toggle("on");

    setBurgerState(!burgerState);
  };

  const toggleDropMenu = () => {
    document
      .getElementsByClassName("custom-select")[0]
      .classList.toggle("open");
  };

  const handleDropMenuClick = (item) => {
    setMeasurementType(item);

    for (let i = 0; i < 3; i++) {
      document
        .getElementsByClassName("custom-option")
        [i].classList.remove("selected");
    }

    document.getElementsByClassName(item)[0].classList.add("selected");
  };

  return (
    <div className="App">
      <header>
        <NavBar
          burgerMenuOptionClicked={burgerMenuOptionClicked}
          changeMenuState={changeMenuState}
        />
      </header>

      {burgerState ? (
        <Fragment>
          <main className="apiarypage-main">
            {/* Left-side menu */}
            <div className="menus">
              <ApiaryMenu />
            </div>

            <div className="graphs">
              <div id="actual-values">
                <h1>Actual values</h1>
                <ActualValues
                  actualValues={actualValues}
                  readOn={readOn}
                  receivedOn={receivedOn}
                />
              </div>
              <div id="charts">
                {/* <h1>Apiary 3 - Hive 2</h1> */}
                {/* <h1 id="measurement-date">Daily measurement</h1> */}
                <div className="custom-select-wrapper" onClick={toggleDropMenu}>
                  <div className="custom-select">
                    <div className="custom-select__trigger">
                      <span>{measurementType} measurements</span>
                      <div className="arrow"></div>
                    </div>
                    <div className="custom-options">
                      <span
                        className="custom-option Daily selected"
                        data-value="daily"
                        onClick={() => {
                          handleDropMenuClick("Daily");
                        }}
                      >
                        Daily measurements
                      </span>
                      <span
                        className="custom-option Weekly"
                        data-value="weekly"
                        onClick={() => {
                          handleDropMenuClick("Weekly");
                        }}
                      >
                        Weekly measurements
                      </span>
                      <span
                        className="custom-option Monthly"
                        data-value="monthly"
                        onClick={() => {
                          handleDropMenuClick("Monthly");
                        }}
                      >
                        Monthly measurements
                      </span>
                    </div>
                  </div>
                </div>

                <Chart allValues={allValues} />
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
};

export default Apiary;
