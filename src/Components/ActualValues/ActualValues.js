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
        <div className="values">
          <p>
            <img alt="" src={tempIcon}></img>Temperature
          </p>
          <p>35{" °C"}</p>
        </div>

        <div className="values">
          <p>
            <img alt="" src={hmdtIcon}></img>Humidity
          </p>
          <p>29{" %"}</p>
        </div>

        <div className="values">
          <p>
            <img alt="" src={weightIcon}></img>Weight
          </p>
          <p>36{" Kg"}</p>
        </div>

        <div className="values">
          <p>
            <img alt="" src={batteryIcon}></img>Battery
          </p>
          <p>86{" %"}</p>
        </div>
      </div>
    );
  }
}

export default ActualValues;
