const express = require('express');
const { registerStudent } = require('../controllers/authController');  // Import only the registerStudent function
const router = express.Router();

// POST route for student registration
router.post('/register', registerStudent);

module.exports = router;
