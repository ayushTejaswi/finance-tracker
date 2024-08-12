import React from "react";
import { Line } from "@ant-design/charts";

const Charts = ({ sortedTrans }) => {
  const sortedData = sortedTrans.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const data = sortedData.map((item) => ({
    date: item.date,
    amount: item.amount,
    type: item.type,
  }));

  const config = {
    data,
    width: 1400,
    autoFit: true,
    xField: "date",
    yField: "amount",
    seriesField: "type",
    yAxis: {
      label: {
        formatter: (v) => `${v}`,
      },
    },
    legend: {
      position: "top-right",
    },
    colorField: "type",
  };

  let chart;

  return (
    <>
      <div className="chart-wrap">
        <div>
          <h2>Financial Overview</h2>
          <Line
            {...config}
            onReady={(chartInstance) => (chart = chartInstance)}
          />
        </div>
      </div>
    </>
  );
};

export default Charts;
