const express = require('express');
const router = express.Router();
const {
  createDailyMealForm,
  getDailyMealForm,
  submitStudentForm,
  getStudentSubmissions,
} = require('../controllers/DailyController');

router.post('/meal-form', createDailyMealForm);

// Get the latest daily meal form for students
router.get('/latest', getDailyMealForm);



// Student submits their meal selection
router.post('/student-form', submitStudentForm);

router.get('/today', getStudentSubmissions);

// Get submissions for a specific student
// router.get('/student-submissions/:studentId', getStudentSubmissions);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router;