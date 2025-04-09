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
import axios from "axios";
import { useParams } from "react-router-dom";

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
  const { studentId } = useParams(); // ← Get studentId from route
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthData, setMonthData] = useState({});
  const [viewType, setViewType] = useState("bar");
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    console.log("studentId:", studentId); // For debugging
    const fetchMonthlyData = async () => {
      try {
        const res = await axios.get(`http://localhost:5066/api/monthly-report/${studentId}`);
        if (res.data.success) {
          const aprilData = {
            taken: res.data.mealTakenDays,
            notTaken: res.data.mealNotTakenDays,
          };

          const dummyData = {
            January: { taken: 10, notTaken: 20 },
            February: { taken: 12, notTaken: 16 },
            March: { taken: 14, notTaken: 17 },
            April: aprilData,
            May: { taken: 13, notTaken: 18 },
            June: { taken: 15, notTaken: 15 },
            July: { taken: 11, notTaken: 19 },
            August: { taken: 10, notTaken: 21 },
            September: { taken: 16, notTaken: 14 },
            October: { taken: 13, notTaken: 17 },
            November: { taken: 15, notTaken: 16 },
            December: { taken: 12, notTaken: 18 },
          };

          setMonthData(dummyData);
        }
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };

    if (studentId) {
      fetchMonthlyData();
      setSelectedMonth(getPreviousMonth());
    }
  }, [studentId]);

  const handleMonthChange = (event) => {
    const month = event.target.value;
    if (monthData[month]) {
      setSelectedMonth(month);
    } else {
      alert(`No report available for ${month}.`);
    }
  };

  const data = monthData[selectedMonth] || { taken: 0, notTaken: 0 };

  const pieChartData = {
    labels: ["Taken", "Not Taken"],
    datasets: [
      {
        label: `Monthly Report - ${selectedMonth}`,
        data: [data.taken, data.notTaken],
        backgroundColor: ["#821818", "#8c611f"],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const chartOptionsCommon = {
    plugins: {
      legend: { labels: { color: "white" } },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} days`;
          },
        },
      },
    },
  };

  const chartOptionsBar = {
    ...chartOptionsCommon,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: { ticks: { color: "white" }, grid: { color: "gray" } },
      y: { ticks: { color: "white" }, grid: { color: "gray" } },
    },
  };

  const chartOptionsPie = {
    ...chartOptionsCommon,
    scales: { x: { display: false }, y: { display: false } },
  };

  const handlePieClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const labels = ["Taken", "Not Taken"];
      setSelectedMeal(`${labels[index]}: ${Object.values(data)[index]} days`);
    }
  };

  return (
    <div className={styles.month_reportContainer}>
      <h2 className={styles.month_reportTitle}>Monthly Report</h2>

      <div className={styles.month_dropdownContainer}>
        <label>Select Month:</label>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{ fontSize: "15px", width: "150px", height: "50px" }}
        >
          {Object.keys(monthData).map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <div className={styles.month_chartContainer}>
        {viewType === "bar" && (
          <div className={styles.month_barChartWrapper}>
            <Bar data={pieChartData} options={chartOptionsBar} />
          </div>
        )}
        {viewType === "pie" && (
          <div className={styles.month_pieChartWrapper}>
            <Pie data={pieChartData} options={chartOptionsPie} onClick={handlePieClick} />
          </div>
        )}
        {viewType === "data" && (
          <table className={styles.month_reportTable}>
            <thead><tr><th>Meal</th><th>Days</th></tr></thead>
            <tbody>
              <tr><td>Taken</td><td>{data.taken}</td></tr>
              <tr><td>Not Taken</td><td>{data.notTaken}</td></tr>
            </tbody>
          </table>
        )}
      </div>

      {selectedMeal && (
        <div className={styles.month_mealInfo}>
          <h3>{selectedMeal}</h3>
        </div>
      )}

      <div className={styles.month_buttonContainer}>
        <button onClick={() => setViewType("pie")}>Pie Chart</button>
        <button onClick={() => setViewType("data")}>Data Table</button>
        <button onClick={() => setViewType("bar")}>Bar Graph</button>
      </div>
    </div>
  );
};

export default MonthlyReport;
