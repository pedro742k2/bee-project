import React, { useState, useEffect } from "react";
import chartOptions from "./GraphConfig";
import "./Chart.css";
/* DATA */
import TempData from "./data/TempData";
import HmdtData from "./data/HmdtData";
import WeightData from "./data/WeightData";
import BatteryData from "./data/BatteryData";

const Chart = ({ allValues }) => {
  const [temp, setTemp] = useState([]);
  const [hmdt, setHmdt] = useState([]);
  const [weight, setWeight] = useState([]);
  const [battery, setBattery] = useState([]);
  const [readingsDate, setReadingsDate] = useState([]);

  useEffect(() => {
    const cloneTemp = [];
    const cloneHmdt = [];
    const cloneWeight = [];
    const cloneBattery = [];
    const cloneReadingsDate = [];
    let error = false;

    try {
      allValues.forEach((value) => {
        const treatedData = value.data.split("-");
        const treatedTime = value.readDate.split("-");

        const tempData = treatedData[0];
        const hmdtData = treatedData[1];
        const weightData = treatedData[2];
        const batteryData = treatedData[3];
        let readDate = treatedTime[3];
        readDate = readDate <= 9 ? "0" + readDate + ":00" : readDate + ":00";

        // console.log(readDate);

        cloneTemp.push(tempData);
        cloneHmdt.push(hmdtData);
        cloneWeight.push(weightData);
        cloneBattery.push(batteryData);
        cloneReadingsDate.push(readDate);
      });
    } catch (err) {
      console.log(err);
      error = true;
    }

    if (!error) {
      setTemp(cloneTemp);
      setHmdt(cloneHmdt);
      setWeight(cloneWeight);
      setBattery(cloneBattery);
      setReadingsDate(cloneReadingsDate);
    }

    /* console.log(
      `temp: ${temp}\nhmdt: ${hmdt}\nweight: ${weight}\nbattery: ${battery}\nreadingsDate: ${readingsDate}`
    ); 
    console.log("\n"); */
  }, [allValues, temp, hmdt, weight, battery, readingsDate]);

  return (
    <div>
      <div className="chart">
        <TempData
          temp={temp}
          readingsDate={readingsDate}
          chartOptions={chartOptions}
        />
      </div>

      <div className="chart">
        <HmdtData
          hmdt={hmdt}
          readingsDate={readingsDate}
          chartOptions={chartOptions}
        />
      </div>

      <div className="chart">
        <WeightData
          weight={weight}
          readingsDate={readingsDate}
          chartOptions={chartOptions}
        />
      </div>

      <div className="chart">
        <BatteryData
          battery={battery}
          readingsDate={readingsDate}
          chartOptions={chartOptions}
        />
      </div>
    </div>
  );
};

export default Chart;
