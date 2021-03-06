// import Hours from "../Hours";
import { Line } from "react-chartjs-2";

const WeightData = ({ ApHv, weight, readingsDate, chartOptions }) => {
  const data = {
    labels: readingsDate,
    datasets: [
      {
        label: `Hive #${ApHv} Weight`,
        data: weight,

        backgroundColor: "rgba(255, 191, 54, 0.2)",
        borderColor: "#FFBF36",
        fill: true,
        lineTension: 0.2,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#fff",
        pointBackgroundColor: "#B24B00",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#B24B00",
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
          text: "Weight (Kg)",
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

export default WeightData;
