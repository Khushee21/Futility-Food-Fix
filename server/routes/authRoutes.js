const express = require("express");
const router = express.Router();
const {
  login,
  registerStudent,
  requestOtp,
  verifyOtpAndResetPassword,
} = require("../controllers/authController");

// Route for student registration
router.post("/register", registerStudent);

// Route for student login
router.post("/login", login);

// Route for requesting OTP for password reset
router.post("/request-otp", requestOtp);

// Route for verifying OTP and resetting password
router.post("/verify-otp", verifyOtpAndResetPassword);

module.exports = router;
