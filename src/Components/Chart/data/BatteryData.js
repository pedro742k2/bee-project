// import Hours from "../Hours";
import { Line } from "react-chartjs-2";

const BatteryData = ({ battery, readingsDate, chartOptions }) => {
  const data = {
    labels: readingsDate,
    datasets: [
      {
        label: "Battery",
        data: battery,

        backgroundColor: "rgba(0, 255, 114, 0.2)",
        borderColor: "#00FF72",
        fill: true,
        lineTension: 0.2,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#fff",
        pointBackgroundColor: "#00C31C",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#00C31C",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        maintainAspectRatio: chartOptions.maintainAspectRatio,

        scales: chartOptions.scaleOptions,

        title: {
          display: chartOptions.displayTitle,
          text: "Battery (%)",
          fontSize: 34,
          fontColor: "#fff",
        },

        legend: {
          display: chartOptions.displayLegend,
          position: chartOptions.legendPosition,
          labels: {
            fontColor: "#fff",
          },
        },
      }}
    />
  );
};

export default BatteryData;
