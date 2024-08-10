import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Chart() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const labels = response.data
          .slice(0, 10)
          .map((product) => product.title.substring(0, 10));
        const data = response.data.slice(0, 10).map((product) => product.price);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Mahsulot narxlari",
              data: data,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              fill: true,
            },
          ],
        });
      })
      .catch((error) => console.error("API'dan ma'lumot olishda xato:", error));
  }, []);

  return (
    <div style={{ width: "600px", marginLeft: "600px" }}>
      {Object.keys(chartData).length > 0 && <Line data={chartData} />}
    </div>
  );
}

export default Chart;
