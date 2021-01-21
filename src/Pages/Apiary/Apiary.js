import React, { useState, useEffect, Fragment } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import ApiaryMenu from "../../Components/ApiaryMenu/ApiaryMenu";
import ActualValues from "../../Components/ActualValues/ActualValues";
import Chart from "../../Components/Chart/Chart";
import "./Apiary.css";
import "./ApiaryResponsive.css";
import ServerApi from "../../Settings/ServerApi";

const Apiary = () => {
  const [burgerState, setBurgerState] = useState(true);
  const [measurementType, setMeasurementType] = useState("Daily");
  const [selectedHives, setSelectedHives] = useState([]);

  const [ApHv, setApHv] = useState("");
  const [allValues, setAllValues] = useState(undefined);
  const [actualValues, setActualValues] = useState(["-", "-", "-", "-"]);
  const [readOn, setReadOn] = useState("Not available yet");
  const [receivedOn, setReceivedOn] = useState("Not available yet");

  const getValues = async () => {
    const nowDate = new Date();
    const currentDate = `${nowDate.getDate()}-${
      nowDate.getMonth() + 1
    }-${nowDate.getFullYear()}`;

    setApHv(selectedHives[0]);
    const data = await fetch(`${ServerApi}/get-data`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ApHv: selectedHives,
        currentDate: currentDate,
        measurementType: "daily",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch(() => {
        return false;
      });

    if (selectedHives.length === 0) {
      setAllValues(undefined);
      setActualValues(["-", "-", "-", "-"]);
      setReadOn("No hive selected");
      setReceivedOn("No hive selected");
    } else {
      if (data.length >= 1) {
        const arrayLength = data.length - 1;

        /* Date of when the data was read */
        const readingsDateInfo = data[arrayLength].readings_date.split("T");
        let date = readingsDateInfo[0].split("-");
        const hours = readingsDateInfo[1].split(".")[0].split(":");
        date = `${date[2]}-${date[1]}-${date[0]} ${hours[0]}:${hours[1]}`;

        /* Date of when the data was received */
        const nowDate = new Date();
        const currentDay =
          nowDate.getDate() <= 9 ? "0" + nowDate.getDate() : nowDate.getDate();
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

        setAllValues(data);
        setActualValues([
          data[arrayLength].temperature,
          data[arrayLength].humidity,
          data[arrayLength].weight,
          data[arrayLength].battery,
        ]);
        setReadOn(date);
        setReceivedOn(currentTime);
      } else {
        setAllValues(undefined);
        setActualValues(["-", "-", "-", "-"]);
        setReadOn("Not available yet");
        setReceivedOn("Not available yet");
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

  useEffect(() => {
    getValues();

    const interval = setInterval(() => {
      getValues();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedHives]);

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
              <ApiaryMenu selectHive={selectHive} />
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

                <Chart allValues={allValues} ApHv={ApHv} />
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
