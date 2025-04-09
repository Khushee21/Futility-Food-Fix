const express = require('express');
const repController = require('../controllers/repController');
const router = express.Router();

// GET route to fetch all students
router.get('/students', repController.getAllStudents);  // Ensure this matches the API call

module.exports = router;