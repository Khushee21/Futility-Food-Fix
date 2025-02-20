const express = require("express");
const router = express.Router();
const { registerStudent, login, requestOtp, verifyOtp, resetPassword } = require("../controllers/authController");

router.post("/register", registerStudent);
router.post("/login", login);
router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
