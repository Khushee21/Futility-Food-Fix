import React, { useState, useEffect } from "react";
import styles from "./MonthlyReport.module.css";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const getPreviousMonth = () => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const today = new Date();
  const previousMonthIndex = today.getMonth() - 1;
  return previousMonthIndex >= 0 ? monthNames[previousMonthIndex] : "December";
};

const MonthlyReport = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [previousValidMonth, setPreviousValidMonth] = useState("");
  const [viewType, setViewType] = useState("bar");
  const [selectedMeal, setSelectedMeal] = useState(null);

  const monthData = {
    January: { breakfast: 16, lunch: 14, dinner: 18, highTea: 10 },
    February: { breakfast: 15, lunch: 12, dinner: 20, highTea: 8 },
  };

  useEffect(() => {
    const prevMonth = getPreviousMonth();
    if (monthData[prevMonth]) {
      setSelectedMonth(prevMonth);
      setPreviousValidMonth(prevMonth);
    } else {
      setSelectedMonth("January");
      setPreviousValidMonth("January");
    }
  }, []);

  const handleMonthChange = (event) => {
    const month = event.target.value;
    if (monthData[month]) {
      setSelectedMonth(month);
      setPreviousValidMonth(month);
    } else {
      alert(`No report available for ${month}.`);
      setSelectedMonth(previousValidMonth);
    }
  };

  const data = monthData[selectedMonth] || { breakfast: 0, lunch: 0, dinner: 0, highTea: 0 };

  const chartOptionsPie = {
    plugins: {
      legend: { labels: { color: "white" } },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const labels = ["Breakfast", "Lunch", "High Tea", "Dinner"];
            return `${labels[tooltipItem.dataIndex]}: ${tooltipItem.raw} days`;
          },
        },
      },
    },
    scales: { x: { display: false }, y: { display: false } },
  };

  const chartOptionsBar = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { labels: { color: "white" } },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const labels = ["Breakfast", "Lunch", "High Tea", "Dinner"];
            return `${labels[tooltipItem.dataIndex]}: ${tooltipItem.raw} days`;
          },
        },
      },
    },
    scales: {
      x: { ticks: { color: "white" }, grid: { color: "gray" } },
      y: { ticks: { color: "white" }, grid: { color: "gray" } },
    },
  };

  const pieChartData = {
    labels: ["Breakfast", "Lunch", "High Tea", "Dinner"],
    datasets: [
      {
        label: `Monthly Report - ${selectedMonth}`,
        data: [data.breakfast, data.lunch, data.highTea, data.dinner],
        backgroundColor: ["#821818", "#8c611f", "#245864", "#6c1c84"],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const handlePieClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const meals = ["Breakfast", "Lunch", "High Tea", "Dinner"];
      setSelectedMeal(`${meals[index]}: ${Object.values(data)[index]} days`);
    }
  };

  return (
    <div className={styles.reportContainer}>
      <h2 className={styles.reportTitle}>Monthly Report</h2>

      <div className={styles.dropdownContainer}>
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ].map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <div className={styles.chartContainer}>
        {viewType === "bar" && <div className={styles.barChartWrapper}><Bar data={pieChartData} options={chartOptionsBar} /></div>}
        {viewType === "pie" && <div className={styles.pieChartWrapper}><Pie data={pieChartData} options={chartOptionsPie} onClick={handlePieClick} /></div>}
        {viewType === "data" && (
          <table className={styles.reportTable}>
            <thead>
              <tr><th>Meal</th><th>Days</th></tr>
            </thead>
            <tbody>
              <tr><td>Breakfast</td><td>{data.breakfast}</td></tr>
              <tr><td>Lunch</td><td>{data.lunch}</td></tr>
              <tr><td>High Tea</td><td>{data.highTea}</td></tr>
              <tr><td>Dinner</td><td>{data.dinner}</td></tr>
            </tbody>
          </table>
        )}
      </div>

      {selectedMeal && <div className={styles.mealInfo}><h3>{selectedMeal}</h3></div>}

      <div className={styles.buttonContainer}>
        <button onClick={() => setViewType("pie")}>Pie Chart</button>
        <button onClick={() => setViewType("data")}>Data Table</button>
        <button onClick={() => setViewType("bar")}>Bar Graph</button>
      </div>
    </div>
  );
};

export default MonthlyReport;