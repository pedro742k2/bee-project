// import Hours from "../Hours";
import { Line } from "react-chartjs-2";

const SolarVoltageData = ({
  ApHv,
  solarVoltage,
  readingsDate,
  chartOptions,
}) => {
  const data = {
    labels: readingsDate,
    datasets: [
      {
        label: `Hive #${ApHv} Solar Panel Voltage`,
        data: solarVoltage,

        backgroundColor: "rgba(255, 246, 58, 0.2)",
        borderColor: "#FFF63A",
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

        scales: {
          xAxes: chartOptions.scaleOptions.xAxes,

          yAxes: [
            {
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },

              ticks: {
                fontColor: "#fff",
                fontSize: 10,
                min: 0,
                max: Math.ceil(Math.max(...data.datasets[0].data) / 10) * 10,
              },
            },
          ],
        },

        title: {
          display: chartOptions.displayTitle,
          text: "Solar panel voltage (v)",
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

export default SolarVoltageData;
