import React, { useState, useEffect, Fragment } from "react";
import chartOptions from "./GraphConfig";
import "./Chart.css";
/* DATA */
import TempData from "./data/TempData";
import HmdtData from "./data/HmdtData";
import WeightData from "./data/WeightData";
import BatteryData from "./data/BatteryData";

const Chart = ({ allValues, ApHv }) => {
  const [readyToDisplay, setReadyToDisplay] = useState(false);
  const [temp, setTemp] = useState([]);
  const [hmdt, setHmdt] = useState([]);
  const [weight, setWeight] = useState([]);
  const [battery, setBattery] = useState([]);
  const [readingsDate, setReadingsDate] = useState([]);

  useEffect(() => {
    let error = false;

    const cloneTemp = [];
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

          cloneTemp.push(value.temperature);
          cloneHmdt.push(value.humidity);
          cloneWeight.push(value.weight);
          cloneBattery.push(value.battery);
          cloneReadingsDate.push(`${receivedDate[0]}:${receivedDate[1]}`);
        });
      }
    } catch (err) {
      error = true;
    }

    if (!error) {
      setReadyToDisplay(true);
      setTemp(cloneTemp);
      setHmdt(cloneHmdt);
      setWeight(cloneWeight);
      setBattery(cloneBattery);
      setReadingsDate(cloneReadingsDate);
    } else {
      setReadyToDisplay(false);
      setTemp([]);
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
            <TempData
              ApHv={ApHv}
              temp={temp}
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
          <h3 style={{ marginTop: "50px", fontSize: "3rem" }}>
            No readings from today
          </h3>
        </div>
      )}
    </div>
  );
};

export default Chart;
