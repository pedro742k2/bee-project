const chartOptions = {
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
          min: 0,
          max: 100,
        },
      },
    ],
  },
};

export default chartOptions;
