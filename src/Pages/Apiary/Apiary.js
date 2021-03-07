import React, { useState, useEffect, useRef, Fragment } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import ApiaryMenu from "../../Components/ApiaryMenu/ApiaryMenu";
import ActualValues from "../../Components/ActualValues/ActualValues";
import Chart from "../../Components/Chart/Chart";
import "./Apiary.css";
import "./ApiaryResponsive.css";
import Fetch from "../../Settings/Fetch";

import NoBeeIcon from "../../Assets/no-bee.svg";
import chartImg from "../../Assets/chart.svg";
import warningIcon from "../../Assets/warning.svg";

const Apiary = () => {
  const [burgerState, setBurgerState] = useState(true);
  const [measurementType, setMeasurementType] = useState("Daily");
  const [selectedHives, setSelectedHives] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [date, setDate] = useState();

  const DEFAULT_ACTUAL_VALUES_STATE = ["-", "-", "-", "-", "-", "-"];
  const DEFAULT_READ_STATE = "No hive selected";

  const [ApHv, setApHv] = useState("");
  const [allValues, setAllValues] = useState(undefined);
  const [actualValues, setActualValues] = useState(DEFAULT_ACTUAL_VALUES_STATE);
  const [readOn, setReadOn] = useState("Not available yet");
  const [receivedOn, setReceivedOn] = useState("Not available yet");

  const graphEndInfo = useRef(null);

  // Check if logged in
  const loggedIn = JSON.parse(sessionStorage.getItem("isLogged"));

  const resetStatesWhenError = () => {
    setAllValues(undefined);
    setActualValues(DEFAULT_ACTUAL_VALUES_STATE);
    setReadOn(DEFAULT_READ_STATE);
    setReceivedOn(DEFAULT_READ_STATE);
  };

  const getValues = async () => {
    setApHv(selectedHives[0]);

    let data = undefined;

    if (loggedIn) {
      try {
        if (selectedHives?.length >= 1) {
          data = await Fetch("/get-data", "post", {
            hiveId: selectedHives[0],
            currentDate: selectedDate,
            measurementType: measurementType.toLowerCase(),
          })
            .then((data) => {
              return data;
            })
            .catch(() => {
              return false;
            });
        }
      } catch {
        data = undefined;
      }

      if (selectedHives?.length === 0) {
        resetStatesWhenError();
      } else if (data) {
        if (
          data !== "Unable to get data" &&
          data !== undefined &&
          data !== null
        ) {
          if (data.data?.length >= 1 || data?.lastValues) {
            try {
              /* Date of when the data was read */
              const readingsDateInfo = new Date(data.lastValues.readings_date);
              const formatedReadingsDateInfo = `${(
                "0" + readingsDateInfo.getDate()
              ).slice(-2)}-${("0" + (readingsDateInfo.getMonth() + 1)).slice(
                -2
              )}-${readingsDateInfo.getFullYear()} ${(
                "0" + readingsDateInfo.getHours()
              ).slice(-2)}:${("0" + readingsDateInfo.getMinutes()).slice(-2)}`;

              /* Date of when the data was received */
              const nowDate = new Date();
              const formatedNowDate = `${("0" + nowDate.getDate()).slice(
                -2
              )}-${("0" + (nowDate.getMonth() + 1)).slice(
                -2
              )}-${nowDate.getFullYear()} ${("0" + nowDate.getHours()).slice(
                -2
              )}:${("0" + nowDate.getMinutes()).slice(-2)}`;
              setDate(
                `${nowDate.getFullYear()}-${(
                  "0" +
                  (nowDate.getMonth() + 1)
                ).slice(-2)}-${("0" + nowDate.getDate()).slice(-2)}`
              );

              setAllValues(data.data);
              setActualValues([
                data.lastValues.weight,
                data.lastValues.internal_temperature,
                data.lastValues.external_temperature,
                data.lastValues.humidity,
                data.lastValues.solar_panel_voltage,
                data.lastValues.battery,
              ]);
              setReadOn(formatedReadingsDateInfo);
              setReceivedOn(formatedNowDate);
            } catch {
              resetStatesWhenError();
            }
          } else {
            resetStatesWhenError();
          }
        } else {
          resetStatesWhenError();
        }
      }
    }
  };

  const addHive = (id) => {
    setSelectedHives([...selectedHives, id]);
  };

  const removeHive = (id) => {
    setSelectedHives(selectedHives.filter((item) => item !== id));
  };

  const selectHive = async (event) => {
    const id = event.target.id;

    const state = document.getElementById(id).classList.toggle("selected");

    if (state) {
      addHive(id);
    } else {
      removeHive(id);
    }
  };

  /* const scrollFunction = () => {
    const actualValuesContainer = document.getElementById("actual-values")
      .style;
    const actualValuesTitle = document.getElementById("actual-values-title")
      .style;

    const readingsDatesContainer = document.getElementsByClassName(
      "actual-info"
    )[0].style;

    try {
      if (window.innerWidth >= 1250) {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          actualValuesContainer.backgroundColor = "rgba(0, 0, 0, 0.6)";
          actualValuesContainer.height = "10vh";
          actualValuesContainer.top = "0";
          actualValuesTitle.display = "none";
          readingsDatesContainer.display = "none";
        } else {
          actualValuesContainer.backgroundColor = "rgba(0, 0, 0, 0.2)";
          actualValuesContainer.height = "40vh";
          actualValuesContainer.top = "10vh";
          actualValuesTitle.display = "block";
          readingsDatesContainer.display = "flex";
        }
      }
    } catch {
      console.warn("Tried to apply scroll effect but failed");
    }
  }; */

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

    for (let i = 0; i < 4; i++) {
      document
        .getElementsByClassName("custom-option")
        [i].classList.remove("selected");
    }

    document.getElementsByClassName(item)[0].classList.add("selected");
  };

  const selectDate = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    /* window.onscroll = () => {
      scrollFunction();
    }; */

    const dateInput = document.getElementsByClassName("select-date")[0];

    try {
      if (measurementType.toLowerCase() === "hourly") {
        dateInput.disabled = true;
        dateInput.value = date;
      } else {
        dateInput.disabled = false;
      }
    } catch (error) {
      console.warn(error);
    }

    if (selectedDate === "") {
      const nowDate = new Date();
      const currentDate = `${nowDate.getFullYear()}-${
        nowDate.getMonth() + 1
      }-${nowDate.getDate()}`;
      setSelectedDate(currentDate);
    }

    getValues();

    const nowDate = new Date();
    setDate(
      `${nowDate.getFullYear()}-${("0" + (nowDate.getMonth() + 1)).slice(
        -2
      )}-${("0" + nowDate.getDate()).slice(-2)}`
    );

    const interval = setInterval(() => {
      getValues();
    }, 5000);

    return () => {
      clearInterval(interval);
      window.onscroll = () => null;
    };
  }, [selectedHives, measurementType, selectedDate]);

  return (
    <div className="App">
      <header>
        <NavBar changeMenuState={changeMenuState} />
      </header>

      {burgerState ? (
        <Fragment>
          <main className="apiarypage-main">
            {loggedIn ? (
              <Fragment>
                <div className="menus">
                  <ApiaryMenu selectHive={selectHive} />
                </div>

                <div className="graphs">
                  <div id="actual-values">
                    <h1 id="actual-values-title">Last values</h1>
                    <ActualValues
                      actualValues={actualValues}
                      readOn={readOn}
                      receivedOn={receivedOn}
                    />
                  </div>
                  <div id="charts">
                    <div className="graph-opt-container">
                      <div
                        className="custom-select-wrapper"
                        onClick={toggleDropMenu}
                      >
                        <div className="custom-select">
                          <div className="custom-select__trigger">
                            <span>{measurementType} measurements</span>
                            <div className="arrow"></div>
                          </div>

                          <div className="custom-options">
                            <span
                              className="custom-option Hourly"
                              data-value="hourly"
                              onClick={() => {
                                handleDropMenuClick("Hourly");
                              }}
                            >
                              Last hour measurements
                            </span>
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

                      <input
                        onChange={selectDate}
                        className="select-date"
                        defaultValue={date}
                        type="date"
                      ></input>
                    </div>

                    <div className="selected-hive-title">
                      <h3>
                        {selectedHives[0] === undefined
                          ? "No hive is selected"
                          : `Hive #${selectedHives[0]} selected`}
                      </h3>
                    </div>

                    {selectedHives[0] === undefined ? (
                      <Fragment />
                    ) : (
                      <div
                        className="graphic-info-btn"
                        onClick={() => {
                          graphEndInfo.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                      >
                        <img src={warningIcon} />
                        <span>Graphics info</span>
                      </div>
                    )}

                    <Chart
                      allValues={allValues}
                      ApHv={ApHv}
                      measurementType={measurementType}
                    />

                    {selectedHives[0] === undefined ? (
                      <Fragment />
                    ) : (
                      <div className="graphs-info" ref={graphEndInfo}>
                        <div className="graph-format-container">
                          <h3>Graphic data type</h3>

                          <div className="graph-format-img">
                            <div>
                              <span>Values</span>
                              <img src={chartImg} />
                            </div>
                            <span>
                              {measurementType.toLowerCase() === "weekly" ||
                              measurementType.toLowerCase() === "monthly"
                                ? "Day"
                                : "Hour : Minute"}
                            </span>
                          </div>
                        </div>

                        <div className="graph-format-container">
                          <h3>Graphic data info</h3>

                          <div className="graph-format-infobox">
                            <p>Hourly measurements</p>
                            <span>
                              Gets all the available data on the database from
                              the last hour
                            </span>
                          </div>

                          <div className="graph-format-infobox">
                            <p>Daily measurements</p>
                            <span>
                              Takes all the available values from today and gets
                              the first values from each hour
                            </span>
                          </div>

                          <div className="graph-format-infobox">
                            <p>Weekly and Monthly measurements</p>
                            <span>
                              Those measurements are taken from readings near 8
                              am each day. The weekly measurements are from the
                              last 7 days and the monthly ones are from the Last
                              31 days
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="not-logged">
                <h1>We can't reach your bees without knowing them :(</h1>
                <p className="bee-p">
                  <img alt="" src={NoBeeIcon}></img>
                  <p>{"You need to log in first"}</p>
                </p>
              </div>
            )}
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
