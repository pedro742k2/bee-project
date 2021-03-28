import React, { useState, Fragment, useEffect } from "react";
import FullscreenAlert from "../FullscreenAlert/FullscreenAlert";
import "./ActualValues.css";
import intTempIcon from "./Assets/int_temp.svg";
import extTempIcon from "./Assets/ext_temp.svg";
import hmdtIcon from "./Assets/humidity.svg";
import weightIcon from "./Assets/weighing-machine.svg";
import voltageIcon from "./Assets/voltage.svg";
import batteryIcon from "./Assets/battery.svg";
import Fetch from "../../Settings/Fetch";

const ActualValues = ({
  selectedHive,
  hiveTare,
  actualValues,
  readOn,
  receivedOn,
}) => {
  const values = {
    weight: Math.round(actualValues[0] * 10) / 10 + "Kg",
    intTemp: Math.round(actualValues[1] * 10) / 10 + "°C",
    extTemp: Math.round(actualValues[2] * 10) / 10 + "°C",
    humidity: actualValues[3] + "%",
    spVoltage: Math.round(actualValues[4] * 10) / 10 + "v",
    battery: actualValues[5] + "%",
  };

  const [tare, setTare] = useState(undefined);
  const [showMessage, setShowMessage] = useState(false);
  const [updating, setUpdating] = useState(false);

  const confirmEdit = (action) => {
    if (action)
      return Fetch("/add-tare", "put", {
        hiveId: selectedHive,
        tareWeight: tare,
      })
        .then((data) => {
          const { tare_weight } = data[0];

          setUpdating(true);

          setShowMessage(false);

          if (
            Math.round((Number(tare_weight) + Number.EPSILON) * 100) / 100 !==
            Math.round((Number(tare) + Number.EPSILON) * 100) / 100
          )
            return alert("Sorry, something went wrong");

          setTare(
            Math.round((Number(tare_weight) + Number.EPSILON) * 100) / 100
          );
          document.getElementById("hiveTareInput").value =
            Math.round((Number(tare_weight) + Number.EPSILON) * 100) / 100;
        })
        .catch((error) => console.log(error));

    setShowMessage(false);
    document.getElementById("hiveTareInput").value = hiveTare;
  };

  useEffect(() => {
    setUpdating(false);
    setTare(document.getElementById("hiveTareInput")?.value);
  }, [actualValues]);

  return (
    <div className="actual-values">
      {showMessage ? (
        <FullscreenAlert
          message={`You are about to add or change the tare weight of hive #${selectedHive} to ${tare}Kg`}
          confirmEdit={confirmEdit}
        />
      ) : (
        <Fragment />
      )}

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
        {selectedHive !== undefined && selectedHive !== null ? (
          <div className="tare-weight-container">
            <span className="tare-weight-title">
              Hive #{selectedHive} tare weight
            </span>

            <span className="tare-weight-input">
              <input
                id="hiveTareInput"
                type="number"
                defaultValue={hiveTare}
                onChange={(event) => setTare(event.target.value)}
              ></input>
              Kg
            </span>

            {Number(hiveTare) ===
              Number(document.getElementById("hiveTareInput")?.value) ||
            tare === undefined ||
            tare?.length === 0 ||
            updating ? (
              <Fragment />
            ) : (
              <button
                onClick={() => {
                  tare?.length >= 1
                    ? setShowMessage(true)
                    : setShowMessage(false);
                }}
              >
                Apply
              </button>
            )}
          </div>
        ) : (
          <Fragment />
        )}

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

      <div className="actual-values-legend">
        <span>
          <b>Int. Temp - </b>Internal Temperature
        </span>
        <span>
          <b>Ext. Temp - </b>External Temperature
        </span>
        <span>
          <b>SP Voltage - </b>Solar Panel Voltage
        </span>
      </div>
    </div>
  );
};

export default ActualValues;
