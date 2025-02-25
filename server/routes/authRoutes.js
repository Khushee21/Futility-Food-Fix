// routes/authRoutes.js

const express = require("express");
const router = express.Router();

const {
  registerStudent,
  login,
  adminLogin,
  requestOtp,
  verifyOtp,
  resetPassword
} = require("../controllers/authController");

// ----- AUTH ROUTES -----
// Removed validateRegistration route since it's not used

// Register Student
router.post("/register", registerStudent);

// Login (for Students and Wardens)
router.post("/login", login);

// Admin Login (for Head Warden)
router.post("/admin/login", adminLogin);

// Request OTP for Password Reset
router.post("/request-otp", requestOtp);

// Verify OTP for Password Reset
router.post("/verify-otp", verifyOtp);

// Reset Password
router.post("/reset-password", resetPassword);

module.exports = router;
