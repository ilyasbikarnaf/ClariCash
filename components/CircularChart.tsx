"use client";
import { Doughnut } from "react-chartjs-2";

import { Chart, ArcElement, Legend } from "chart.js";
import { useMemo } from "react";
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
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const label = context.label || "";
          const value = context.raw;
          return `${label}: $${value.toLocaleString()}`;
        },
      },
    },
  },
};

export default function CircularChart({
  income,
  expense,
}: {
  income: number;
  expense: number;
}) {
  const data = useMemo(() => {
    return {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          // label: "Income vs Expenses",
          data: [income, expense],
          backgroundColor: ["#20C997", "#EB5757"],
          borderColor: "transparent",
          hoverOffset: 4,
        },
      ],
    };
  }, [income, expense]);

  return <Doughnut className="p-4 w-full" data={data} options={options} />;
}
