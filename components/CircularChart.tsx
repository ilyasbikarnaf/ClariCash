"use client";
import { Doughnut } from "react-chartjs-2";

import { Chart, ArcElement, Legend } from "chart.js";
import { useMemo } from "react";
Chart.register(ArcElement, Legend);

const options = {
  cutout: "70%",
  maintainAspectRatio: true,
  responsive: true,
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

const legendSpacingPlugin = {
  id: "legendSpacing",
  beforeInit(chart) {
    const origFit = chart.legend.fit;
    chart.legend.fit = function fit() {
      origFit.bind(this)();
      this.height += 10; // ← add 20px under legend
    };
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
          data: [income, expense],
          backgroundColor: ["#20C997", "#EB5757"],
          borderColor: "transparent",
          hoverOffset: 4,
        },
      ],
    };
  }, [income, expense]);

  return expense === 0 && income === 0 ? (
    <p className="text-center">Create a Transaction to display The Chart</p>
  ) : (
    <Doughnut
      className="p-4 w-[100px] lg:w-[300px] "
      data={data}
      options={options}
      plugins={[legendSpacingPlugin]}
    />
  );
}
