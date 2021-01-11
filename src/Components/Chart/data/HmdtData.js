import Hours from "../Hours";

const HmdtData = {
  labels: Hours,
  datasets: [
    {
      label: "Humidity",
      data: [32, 31, 30, 29, 28, 25, 26, 27, 28, 29],

      backgroundColor: "rgba(0, 0, 0, 0)",
      borderColor: "#007CFF",
      fill: true,
      lineTension: 0.3,
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

export default HmdtData;
