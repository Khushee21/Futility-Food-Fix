const express = require("express");
const router = express.Router();
const { 
  registerStudent, 
  login, 
  resetPassword, 
  requestOtp, 
  verifyOtp, 
  adminLogin 
} = require("../controllers/authController"); 

// Route for student registration
router.post("/register", registerStudent);

// Route for login
router.post("/login", login);

// Route for admin login
router.post("/admin/login", adminLogin);

// Route for requesting OTP
router.post("/request-otp", requestOtp);

// Route for verifying OTP
router.post("/verify-otp", verifyOtp);

// Route for password reset
router.post("/reset-password", resetPassword);

module.exports = router;
