import React, { useState, useEffect, Fragment } from "react";
import chartOptions from "./GraphConfig";
import "./Chart.css";
/* DATA */
import IntTempData from "./data/InternalTempData";
import ExtTempData from "./data/ExternalTempData";
import HmdtData from "./data/HmdtData";
import WeightData from "./data/WeightData";
import BatteryData from "./data/BatteryData";

const Chart = ({ allValues, ApHv, measurementType }) => {
  const [readyToDisplay, setReadyToDisplay] = useState(false);
  // const [temp, setTemp] = useState([]);
  const [extTemp, setExtTemp] = useState([]);
  const [intTemp, setIntTemp] = useState([]);
  const [hmdt, setHmdt] = useState([]);
  const [weight, setWeight] = useState([]);
  const [battery, setBattery] = useState([]);
  const [readingsDate, setReadingsDate] = useState([]);

  useEffect(() => {
    let error = false;

    const cloneExtTemp = [];
    const cloneIntTemp = [];
    const cloneHmdt = [];
    const cloneWeight = [];
    const cloneBattery = [];
    const cloneReadingsDate = [];

    let allValuesLen = 0;
    try {
      allValuesLen = allValues.length;
    } catch {
      error = true;
    }

    if (allValuesLen === 0) {
      error = true;
    }

    try {
      if (!error) {
        allValues.forEach((value) => {
          const receivedDate = value.readings_date
            .split("T")[1]
            .split(".")[0]
            .split(":");

          cloneExtTemp.push(value.external_temperature);
          cloneIntTemp.push(value.internal_temperature);
          cloneHmdt.push(value.humidity);
          cloneWeight.push(value.weight);
          cloneBattery.push(value.battery);

          if (
            measurementType.toLowerCase() !== "weekly" &&
            measurementType.toLowerCase() !== "monthly"
          ) {
            cloneReadingsDate.push(`${receivedDate[0]}:${receivedDate[1]}`);
          } else {
            cloneReadingsDate.push(
              value.readings_date.split("T")[0].split("-")[2]
            );
          }
        });
      }
    } catch (err) {
      error = true;
    }

    if (!error) {
      setReadyToDisplay(true);
      setExtTemp(cloneExtTemp);
      setIntTemp(cloneIntTemp);
      setHmdt(cloneHmdt);
      setWeight(cloneWeight);
      setBattery(cloneBattery);
      setReadingsDate(cloneReadingsDate);
    } else {
      setReadyToDisplay(false);
      setExtTemp([]);
      setIntTemp([]);
      setHmdt([]);
      setWeight([]);
      setBattery([]);
      setReadingsDate([]);
    }
  }, [allValues]);

  return (
    <div>
      {readyToDisplay ? (
        <Fragment>
          <div className="chart">
            <WeightData
              ApHv={ApHv}
              weight={weight}
              readingsDate={readingsDate}
              chartOptions={chartOptions}
            />
          </div>

          <div className="chart">
            <ExtTempData
              ApHv={ApHv}
              temp={extTemp}
              readingsDate={readingsDate}
              chartOptions={chartOptions}
            />
          </div>

          <div className="chart">
            <IntTempData
              ApHv={ApHv}
              temp={intTemp}
              readingsDate={readingsDate}
              chartOptions={chartOptions}
            />
          </div>

          <div className="chart">
            <HmdtData
              ApHv={ApHv}
              hmdt={hmdt}
              readingsDate={readingsDate}
              chartOptions={chartOptions}
            />
          </div>

          <div className="chart">
            <BatteryData
              ApHv={ApHv}
              battery={battery}
              readingsDate={readingsDate}
              chartOptions={chartOptions}
            />
          </div>
        </Fragment>
      ) : (
        <div>
          <h3 style={{ marginTop: "50px", fontSize: "3rem" }}>No readings</h3>
        </div>
      )}
    </div>
  );
};

export default Chart;
