// In authRoutes.js

const express = require("express");
const router = express.Router();
const { login, resetPassword } = require("../controllers/authController"); // ✅ Importing correctly

// Route for login
router.post("/login", login);

// Route for reset password
router.post("/reset-password", resetPassword);  // ✅ Correct usage of resetPassword

module.exports = router;
