const bcrypt = require('bcryptjs');
const Student = require('../models/Student');

// Student Registration
exports.registerStudent = async (req, res) => {
  try {
    const { id, name, degree, email, parentEmail, password } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ $or: [{ email }, { id }] });
    if (existingStudent) {
      return res.status(400).json({ error: 'Student with this ID or Email already exists.' });
    }

    // Create new student instance
    const newStudent = new Student({
      id,
      name,
      degree,
      email,
      parentEmail,
      password: await bcrypt.hash(password, 10), // Hash the password
    });

    // Save student to database
    const savedStudent = await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully', student: savedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering student' });
  }
};

// Student Login
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

// Reset Password
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

    student.password = await bcrypt.hash(newPassword, 10); // Hash the new password
    await student.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

