const express = require('express');
const router = express.Router();
const { getMonthlyMealStats } = require('../controllers/monthlyReportController');

// Route: GET /api/monthly-report/:studentId
router.get('/:studentId', getMonthlyMealStats);

module.exports = router;
