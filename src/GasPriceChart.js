import React, { useState, useEffect } from "react";
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
import { Line } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GasPriceChart = () => {
  const [chartData, setChartData] = useState(null);

  const fetchGasPrices = async () => {
    try {
      const response = await axios.get(
        "http://avaxgastracker.replit.app/api/gas-prices"
      );
      const prices = response.data;

      const chartLabels = prices.map((price) =>
        new Date(price.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      const slowPrices = prices.map(
        (price) => parseInt(price.slowprice) / 1000000000
      );
      const mediumPrices = prices.map((price) =>
        parseInt(price.mediumprice / 1000000000)
      );
      const highPrices = prices.map(
        (price) => parseInt(price.highprice) / 1000000000
      );

      console.log("slowPrices " + JSON.stringify(chartLabels));
      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: "Slow Price",
            data: slowPrices,
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Normal Price",
            data: mediumPrices,
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "High Price",
            data: highPrices,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching gas prices:", error);
    }
  };

  useEffect(() => {
    fetchGasPrices();
  }, []);

  return (
    <div>
      {chartData && <Line data={chartData} options={{ responsive: true }} />}
    </div>
  );
};

export default GasPriceChart;
