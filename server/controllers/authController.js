// In authController.js

const bcrypt = require('bcrypt');
const Student = require('../models/Student');

// Reset Password function
exports.resetPassword = async (req, res) => {
  console.log("🟢 Reset Password API Hit");

  const { id, newPassword } = req.body;

  if (!id || !newPassword) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;

    await student.save();
    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login function (ensure it's implemented)
exports.login = async (req, res) => {
  console.log("🟢 Login API Hit");

  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const student = await Student.findOne({ id });

    if (!student) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
