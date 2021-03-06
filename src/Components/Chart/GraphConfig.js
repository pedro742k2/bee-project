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

        gridLines: {
          color: "rgba(0, 0, 0, 0)",
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

        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
      },
    ],
  },
};

export default chartOptions;
