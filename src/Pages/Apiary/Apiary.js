import React, { useState, useEffect, Fragment } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import ApiaryMenu from "../../Components/ApiaryMenu/ApiaryMenu";
import ActualValues from "../../Components/ActualValues/ActualValues";
import Chart from "../../Components/Chart/Chart";
import "./Apiary.css";
import "./ApiaryResponsive.css";
import Fetch from "../../Settings/Fetch";

import NoBeeIcon from "../../Assets/no-bee.svg";

const Apiary = ({ loggedIn }) => {
  const [burgerState, setBurgerState] = useState(true);
  const [measurementType, setMeasurementType] = useState("Daily");
  const [selectedHives, setSelectedHives] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [date, setDate] = useState();

  const [ApHv, setApHv] = useState("");
  const [allValues, setAllValues] = useState(undefined);
  const [actualValues, setActualValues] = useState(["-", "-", "-", "-"]);
  const [readOn, setReadOn] = useState("Not available yet");
  const [receivedOn, setReceivedOn] = useState("Not available yet");

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
        setAllValues(undefined);
        setActualValues(["-", "-", "-", "-"]);
        setReadOn("No hive selected");
        setReceivedOn("No hive selected");
      } else if (data) {
        if (
          data !== "Unable to get data" &&
          data !== "not available" &&
          data !== undefined
        ) {
          if (data.firstDataFromHours.length >= 1 || data.lastValues) {
            try {
              /* Date of when the data was read */
              const readingsDateInfo = data.lastValues.readings_date.split("T");
              let date = readingsDateInfo[0].split("-");
              const hours = readingsDateInfo[1].split(".")[0].split(":");
              date = `${date[2]}-${date[1]}-${date[0]} ${hours[0]}:${hours[1]}`;

              /* Date of when the data was received */
              const nowDate = new Date();
              const currentDay =
                nowDate.getDate() <= 9
                  ? "0" + nowDate.getDate()
                  : nowDate.getDate();
              const currentMonth =
                nowDate.getMonth() + 1 <= 9
                  ? "0" + (nowDate.getMonth() + 1)
                  : nowDate.getMonth() + 1;
              const currentYear = nowDate.getFullYear();
              const currentHour =
                nowDate.getHours() <= 9
                  ? "0" + nowDate.getHours()
                  : nowDate.getHours();
              const currentMinute =
                nowDate.getMinutes() <= 9
                  ? "0" + nowDate.getMinutes()
                  : nowDate.getMinutes();
              const currentTime = `${currentDay}-${currentMonth}-${currentYear} ${currentHour}:${currentMinute}`;
              setDate(`${currentYear}-${currentMonth}-${currentDay}`);

              setAllValues(data.firstDataFromHours);
              setActualValues([
                data.lastValues.temperature,
                data.lastValues.humidity,
                data.lastValues.weight,
                data.lastValues.battery,
              ]);
              setReadOn(date);
              setReceivedOn(currentTime);
            } catch (error) {
              console.log(error);
            }
          } else {
            setAllValues(undefined);
            setActualValues(["-", "-", "-", "-"]);
            setReadOn("Not available yet");
            setReceivedOn("Not available yet");
          }
        } else {
          setAllValues(undefined);
          setActualValues(["-", "-", "-", "-"]);
          setReadOn("Not available yet");
          setReceivedOn("Not available yet");
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

  const scrollFunction = () => {
    const actualValuesContainer = document.getElementById("actual-values");
    const actualValuesTitle = document.getElementById("actual-values-title");

    const readingsDatesContainer = document.getElementsByClassName(
      "actual-info"
    )[0];

    if (window.innerWidth >= 1400) {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        actualValuesContainer.style.borderRadius = "10px";
        actualValuesContainer.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
        actualValuesContainer.style.height = "10vh";
        actualValuesContainer.style.top = "0";
        actualValuesTitle.style.display = "none";

        readingsDatesContainer.style.display = "none";
      } else {
        actualValuesContainer.style.borderRadius = "0";
        actualValuesContainer.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        actualValuesContainer.style.height = "40vh";
        actualValuesContainer.style.top = "10vh";
        actualValuesTitle.style.display = "block";

        readingsDatesContainer.style.display = "flex";
      }
    }
  };

  useEffect(() => {
    window.onscroll = () => {
      scrollFunction();
    };

    if (selectedDate === "") {
      const nowDate = new Date();
      const currentDate = `${nowDate.getFullYear()}-${
        nowDate.getMonth() + 1
      }-${nowDate.getDate()}`;
      setSelectedDate(currentDate);
    }

    getValues();

    const nowDate = new Date();
    const currentDay =
      nowDate.getDate() <= 9 ? "0" + nowDate.getDate() : nowDate.getDate();
    const currentMonth =
      nowDate.getMonth() + 1 <= 9
        ? "0" + (nowDate.getMonth() + 1)
        : nowDate.getMonth() + 1;
    const currentYear = nowDate.getFullYear();
    setDate(`${currentYear}-${currentMonth}-${currentDay}`);

    const interval = setInterval(() => {
      getValues();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedHives, measurementType, selectedDate]);

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

  const selectDate = (event) => {
    setSelectedDate(event.target.value);
  };

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

                    <Chart allValues={allValues} ApHv={ApHv} />
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
