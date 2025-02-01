const express = require("express");
const router = express.Router();
const { login, resetPassword, registerStudent } = require("../controllers/authController");

// Route for student registration
router.post("/register", registerStudent);

// Route for login
router.post("/login", login);

// Route for password reset
router.post("/reset-password", resetPassword);

module.exports = router;
