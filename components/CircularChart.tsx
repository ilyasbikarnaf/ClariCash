import { Doughnut } from "react-chartjs-2";

import { Chart, ArcElement, Legend } from "chart.js";
Chart.register(ArcElement, Legend);

const options = {
  cutout: "70%",
  plugins: {
    legend: {
      position: "top",
      align: "center",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 10,
        boxWidth: 10,
        boxHeight: 10,
        borderWidth: 10,
      },
    },
  },
};

const data = {
  labels: ["Income", "Expenses"],
  datasets: [
    {
      label: "My First Dataset",
      data: [140, 50],
      backgroundColor: ["#20C997", "#EB5757"],
      borderColor: "transparent",
      hoverOffset: 4,
    },
  ],
};

export default function CircularChart() {
  return <Doughnut data={data} options={options} />;
}
