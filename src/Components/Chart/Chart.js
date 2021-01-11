import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./Chart.css";

/* DATA */
import TempData from "./data/TempData";
import HmdtData from "./data/HmdtData";
import WeightData from "./data/WeightData";
import BatteryData from "./data/BatteryData";

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      chartDataTemp: TempData,
      chartDataHmdt: HmdtData,
      chartDataWeight: WeightData,
      chartDataBattery: BatteryData,
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: false,
    legendPosition: "right",
    maintainAspectRatio: false,
    scaleOptions: {
      xAxes: [
        {
          ticks: {
            fontColor: "#fff",
            fontSize: 10,
          },
        },
      ],

      yAxes: [
        {
          ticks: {
            fontColor: "#fff",
            fontSize: 10,
          },
        },
      ],
    },
  };

  render() {
    return (
      <div>
        <div className="chart">
          <Line
            data={this.state.chartDataTemp}
            options={{
              maintainAspectRatio: this.props.maintainAspectRatio,

              scales: this.props.scaleOptions,

              title: {
                display: this.props.displayTitle,
                text: "Temperature",
                fontSize: 40,
                fontColor: "#fff",
              },

              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition,
                labels: {
                  fontColor: "#fff",
                },
              },
            }}
          />
        </div>

        <div className="chart">
          <Line
            data={this.state.chartDataHmdt}
            options={{
              maintainAspectRatio: this.props.maintainAspectRatio,

              scales: this.props.scaleOptions,

              title: {
                display: this.props.displayTitle,
                text: "Humidity",
                fontSize: 40,
                fontColor: "#fff",
              },

              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition,
                labels: {
                  fontColor: "#fff",
                },
              },
            }}
          />
        </div>

        <div className="chart">
          <Line
            data={this.state.chartDataWeight}
            options={{
              maintainAspectRatio: this.props.maintainAspectRatio,

              scales: this.props.scaleOptions,

              title: {
                display: this.props.displayTitle,
                text: "Weight",
                fontSize: 40,
                fontColor: "#fff",
              },

              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition,
                labels: {
                  fontColor: "#fff",
                },
              },
            }}
          />
        </div>

        <div className="chart">
          <Line
            data={this.state.chartDataBattery}
            options={{
              maintainAspectRatio: this.props.maintainAspectRatio,

              scales: this.props.scaleOptions,

              title: {
                display: this.props.displayTitle,
                text: "Battery",
                fontSize: 40,
                fontColor: "#fff",
              },

              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition,
                labels: {
                  fontColor: "#fff",
                },
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default Chart;
