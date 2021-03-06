// import Hours from "../Hours";
import { Line } from "react-chartjs-2";

const TempData = ({ ApHv, temp, readingsDate, chartOptions }) => {
  const data = {
    labels: readingsDate,
    datasets: [
      {
        label: `Hive #${ApHv} External temperature`,
        data: temp,

        backgroundColor: "rgba(255, 115, 30, 0.2)",
        borderColor: "#FF731E",
        fill: true,
        lineTension: 0.2,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#fff",
        pointBackgroundColor: "#FF0000",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#FF0000",
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
          text: "External temperature (°C)",
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

export default TempData;
