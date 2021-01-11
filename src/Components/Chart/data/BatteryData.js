import Hours from "../Hours";

const BatteryData = {
  labels: Hours,
  datasets: [
    {
      label: "Battery",
      data: [100, 99, 98, 97, 97, 96, 95, 94, 94, 92],

      backgroundColor: "rgba(0, 0, 0, 0)",
      borderColor: "#00FF72",
      fill: true,
      lineTension: 0.3,
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

export default BatteryData;
