// import Hours from "../Hours";
import { Line } from "react-chartjs-2";

const HmdtData = ({ ApHv, hmdt, readingsDate, chartOptions }) => {
  const data = {
    labels: readingsDate,
    datasets: [
      {
        label: `Hive #${ApHv} Humidity`,
        data: hmdt,

        backgroundColor: "rgba(27, 176, 255, 0.2)",
        borderColor: "#1BB0FF",
        fill: true,
        lineTension: 0.2,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#fff",
        pointBackgroundColor: "#004AA6",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#004AA6",
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
          text: "Humidity (%)",
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

export default HmdtData;
