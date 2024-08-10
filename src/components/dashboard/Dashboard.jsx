import React from "react";
import Chart from "./chart/Chart";
import Products from "./products/Products";

const Dashboard = () => {
  return (
    <div className="chart">
      <Chart />
      <Products />
    </div>
  );
};

export default Dashboard;
