import React, { Component } from "react";
import "./ActualValues.css";
import tempIcon from "./Assets/thermometer.svg";
import hmdtIcon from "./Assets/humidity.svg";
import weightIcon from "./Assets/weighing-machine.svg";
import batteryIcon from "./Assets/battery.svg";

class ActualValues extends Component {
  render() {
    return (
      <div className="actual-values">
        <div className="values-container">
          <div className="values">
            <p>
              <img alt="" src={tempIcon}></img>Temperature
            </p>
            <p className="hidden-img">
              <img alt="" src={tempIcon}></img>
            </p>

            <p>35{" °C"}</p>
          </div>

          <div className="values">
            <p>
              <img alt="" src={hmdtIcon}></img>Humidity
            </p>
            <p className="hidden-img">
              <img alt="" src={hmdtIcon}></img>
            </p>

            <p>29{" %"}</p>
          </div>

          <div className="values">
            <p>
              <img alt="" src={weightIcon}></img>Weight
            </p>
            <p className="hidden-img">
              <img alt="" src={weightIcon}></img>
            </p>

            <p>36{" Kg"}</p>
          </div>

          <div className="values">
            <p>
              <img alt="" src={batteryIcon}></img>Battery
            </p>
            <p className="hidden-img">
              <img alt="" src={batteryIcon}></img>
            </p>

            <p>86{" %"}</p>
          </div>
        </div>

        <div className="actual-info">
          <p>
            <span>Received on:</span> 18/01/2021 - 16:28h GMT
          </p>
          <p>
            <span>Readings from:</span> 18/01/2021 - 16:26h GMT
          </p>
        </div>
      </div>
    );
  }
}

export default ActualValues;
