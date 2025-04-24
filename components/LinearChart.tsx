import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const options = {
  plugins: {
    legend: {
      align: "start",
      position: "top",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 6,
        boxHeight: 7,
        padding: 20,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Incomes",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "#20C997",
      borderColor: "#20C997",
      pointStyle: "circle",
      pointRadius: 6,
    },
    {
      label: "Expenses",
      data: [40, 25, 35, 51, 54, 76],
      fill: true,
      backgroundColor: "#EB5757",
      borderColor: "#EB5757",
      pointStyle: "circle",
      pointRadius: 6,
    },
  ],
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LinearChart() {
  return <Line data={data} options={options} />;
}
