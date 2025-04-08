// routes/monthlyReportRoutes.js
const express = require("express");
const router = express.Router();
const { getMonthlyReport } = require("../controllers/MonthlyReportController");

// Route to get the monthly report
router.get("/monthly-report", getMonthlyReport);

module.exports = router;
