import React from "react";
import "./ActualValues.css";
import intTempIcon from "./Assets/int_temp.svg";
import extTempIcon from "./Assets/ext_temp.svg";
import hmdtIcon from "./Assets/humidity.svg";
import weightIcon from "./Assets/weighing-machine.svg";
import voltageIcon from "./Assets/voltage.svg";
import batteryIcon from "./Assets/battery.svg";

const ActualValues = ({ actualValues, readOn, receivedOn }) => {
  const values = {
    weight: Math.round(actualValues[0] * 10) / 10 + "Kg",
    intTemp: Math.round(actualValues[1] * 10) / 10 + "°C",
    extTemp: Math.round(actualValues[2] * 10) / 10 + "°C",
    humidity: actualValues[3] + "%",
    spVoltage: Math.round(actualValues[4] * 10) / 10 + "v",
    battery: actualValues[5] + "%",
  };

  return (
    <div className="actual-values">
      <div className="values-container">
        <div className="values">
          <p>
            <img alt="" src={weightIcon}></img>
            Weight
          </p>
          <p className="hidden-img">
            <img alt="" src={weightIcon}></img>
          </p>

          {actualValues[0] === "-" ? <p>...</p> : <p>{values.weight}</p>}
        </div>

        <div className="values">
          <p>
            <img alt="" src={intTempIcon}></img>
            Int. Temp
          </p>
          <p className="hidden-img">
            <img alt="" src={intTempIcon}></img>
          </p>

          {actualValues[1] === "-" ? <p>...</p> : <p>{values.intTemp}</p>}
        </div>

        <div className="values">
          <p>
            <img alt="" src={extTempIcon}></img>
            Ext. Temp
          </p>
          <p className="hidden-img">
            <img alt="" src={extTempIcon}></img>
          </p>

          {actualValues[2] === "-" ? <p>...</p> : <p>{values.extTemp}</p>}
        </div>

        <div className="values">
          <p>
            <img alt="" src={hmdtIcon}></img>
            Humidity
          </p>
          <p className="hidden-img">
            <img alt="" src={hmdtIcon}></img>
          </p>

          {actualValues[3] === "-" ? <p>...</p> : <p>{values.humidity}</p>}
        </div>

        <div className="values">
          <p>
            <img alt="" src={voltageIcon}></img>
            SP Voltage
          </p>
          <p className="hidden-img">
            <img alt="" src={voltageIcon}></img>
          </p>

          {actualValues[4] === "-" ? <p>...</p> : <p>{values.spVoltage}</p>}
        </div>

        <div className="values">
          <p>
            <img alt="" src={batteryIcon}></img>
            Battery
          </p>
          <p className="hidden-img">
            <img alt="" src={batteryIcon}></img>
          </p>

          {actualValues[5] === "-" ? <p>...</p> : <p>{values.battery}</p>}
        </div>
      </div>

      <div className="actual-info">
        <p>
          <span>Date format:</span> {"(DD/MM/YYYY HH:MM)"}
        </p>

        <p>
          <span>Received on:</span> {`${receivedOn}`}
        </p>

        <p>
          <span>Readings from:</span> {`${readOn}`}
        </p>
      </div>
    </div>
  );
};

export default ActualValues;
