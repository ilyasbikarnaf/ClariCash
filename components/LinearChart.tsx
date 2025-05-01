"use client";
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
import { useMemo } from "react";
import { TransactionType } from "@/lib/types";

const TIME_LABELS = [
  "00:00",
  "03:00",
  "06:00",
  "09:00",
  "12:00",
  "15:00",
  "18:00",
  "21:00",
];

const legendSpacingPlugin = {
  id: "legendSpacing",
  beforeInit(chart) {
    const origFit = chart.legend.fit;
    chart.legend.fit = function () {
      origFit.bind(this)();
      this.height += 20; // add 20px under the legend
    };
  },
};

const options = {
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  responsive: true,
  plugins: {
    legend: {
      align: "start",
      position: "top",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 6,
        boxHeight: 7,
      },
      margin: 20,
    },
    tooltip: {
      backgroundColor: "#",
      callbacks: {
        label: function (context) {
          const label = context.dataset.label || "";
          const value = context.parsed.y;
          return `${label}: $${value.toLocaleString()}`;
        },
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
        beginAtZero: true,
      },
      ticks: {
        maxTicksLimit: 7,
        padding: 5,
      },
      beginAtZero: true,
      suggestedMin: 0,
    },
  },
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

export default function LinearChart({ data }: { data?: TransactionType[] }) {
  console.log(data);

  const chartData = useMemo(() => {
    const income = Array(TIME_LABELS.length).fill(0);
    const expense = Array(TIME_LABELS.length).fill(0);

    data?.forEach((transaction) => {
      const date = new Date(transaction.date);
      const hour = date.getHours();
      const index = Math.floor(hour / 3);

      if (transaction.category === "expense") {
        expense[index] += transaction.amount;
      } else if (transaction.category === "income") {
        income[index] += transaction.amount;
      }
    });

    for (let i = 1; i < TIME_LABELS.length; i++) {
      if (income[i] === 0) income[i] = income[i - 1];
      if (expense[i] === 0) expense[i] = expense[i - 1];
    }

    return {
      labels: TIME_LABELS,
      datasets: [
        {
          label: "Income",
          data: income,
          fill: true,
          backgroundColor: "rgba(32, 201, 151, 0.2)", // light green
          borderColor: "#20C997",
          borderWidth: 2,
          pointRadius: 6,
          order: 1,
        },
        {
          label: "Expense",
          data: expense,
          fill: true,
          backgroundColor: "rgba(235, 87, 87, 0.2)", // light red
          borderColor: "#EB5757",
          borderWidth: 2,
          pointRadius: 6,
          order: 2,
        },
      ],
    };
  }, [data]);
  console.log(data);

  return (
    <Line
      data={chartData}
      options={options}
      className="h-full"
      plugins={[legendSpacingPlugin]}
    />
  );
}
