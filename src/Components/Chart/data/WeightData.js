// import Hours from "../Hours";
import { Line } from "react-chartjs-2";

const WeightData = ({ weight, readingsDate, chartOptions }) => {
  const data = {
    labels: readingsDate,
    datasets: [
      {
        label: "Weight",
        data: weight,

        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "#FFA600",
        fill: true,
        lineTension: 0.3,
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
              ticks: {
                fontColor: "#fff",
                fontSize: 10,
                min: Math.min(...data.datasets[0].data) - 10,
                max: Math.max(...data.datasets[0].data) + 10,
              },
            },
          ],
        },

        title: {
          display: chartOptions.displayTitle,
          text: "Weight (Kg)",
          fontSize: 40,
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
