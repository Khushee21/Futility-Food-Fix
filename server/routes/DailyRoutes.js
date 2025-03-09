const express = require('express');
const router = express.Router();
const {
  createDailyMealForm,
  getDailyMealForm,
  submitStudentForm,
  getStudentSubmissions
} = require('../controllers/DailyController');

// Warden generates a new meal form
router.post('/meal-form', createDailyMealForm);

// Get the latest daily meal form for students
router.get('/meal-form/latest', getDailyMealForm);


// Student submits their meal selection
router.post('/student-form', submitStudentForm);

// Get submissions for a specific student
router.get('/student-submissions/:studentId', getStudentSubmissions);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router;