import React from "react";
import "./ActualValues.css";
import tempIcon from "./Assets/thermometer.svg";
import hmdtIcon from "./Assets/humidity.svg";
import weightIcon from "./Assets/weighing-machine.svg";
import batteryIcon from "./Assets/battery.svg";

const ActualValues = ({ actualValues, readOn, receivedOn }) => {
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

          <p>{`${actualValues[0]} °C`}</p>
        </div>

        <div className="values">
          <p>
            <img alt="" src={hmdtIcon}></img>Humidity
          </p>
          <p className="hidden-img">
            <img alt="" src={hmdtIcon}></img>
          </p>

          <p>{`${actualValues[1]} %`}</p>
        </div>

        <div className="values">
          <p>
            <img alt="" src={weightIcon}></img>Weight
          </p>
          <p className="hidden-img">
            <img alt="" src={weightIcon}></img>
          </p>

          <p>{`${actualValues[2]} Kg`}</p>
        </div>

        <div className="values">
          <p>
            <img alt="" src={batteryIcon}></img>Battery
          </p>
          <p className="hidden-img">
            <img alt="" src={batteryIcon}></img>
          </p>

          <p>{`${actualValues[3]} %`}</p>
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
