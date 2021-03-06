import React from "react";
import "./ActualValues.css";
import tempIcon from "./Assets/thermometer.svg";
import hmdtIcon from "./Assets/humidity.svg";
import weightIcon from "./Assets/weighing-machine.svg";
import batteryIcon from "./Assets/battery.svg";

const ActualValues = ({ actualValues, readOn, receivedOn }) => {
  const btnOptions = {
    content: ["Weight", "Temperature", "Humidity", "Battery"],
    values: [
      Math.round(actualValues[2] * 10) / 10 + "Kg",
      Math.round(actualValues[0] * 10) / 10 + "°C",
      actualValues[1] + "%",
      actualValues[3] + "%",
    ],
    icons: [weightIcon, tempIcon, hmdtIcon, batteryIcon],
  };

  return (
    <div className="actual-values">
      <div className="values-container">
        {btnOptions.content.map((value, index) => {
          return (
            <div className="values">
              <p>
                <img alt="" src={btnOptions.icons[index]}></img>
                {value}
              </p>
              <p className="hidden-img">
                <img alt="" src={btnOptions.icons[index]}></img>
              </p>

              {actualValues[index] === "-" ? (
                <p>...</p>
              ) : (
                <p>{btnOptions.values[index]}</p>
              )}
            </div>
          );
        })}
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
