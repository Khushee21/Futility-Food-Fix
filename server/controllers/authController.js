const Student = require("../models/Student");
const nodemailer = require("nodemailer");

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Student Registration
exports.registerStudent = async (req, res) => {
  try {
    const { id, name, degree, email, parentEmail, password } = req.body;

    // Check if student exists in admission database
    const admissionRecord = await Admission.findOne({ id, name, degree, email });
    if (!admissionRecord) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid registration details" });
    }

    // Check if student already registered
    const existingStudent = await Student.findOne({ $or: [{ email }, { id }] });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student with this ID or Email already exists.",
      });
    }

    // Store the password as plain text (consider using bcrypt for security)
    const newStudent = new Student({
      id,
      name,
      degree,
      email,
      parentEmail,
      password, 
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();
    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student: savedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error registering student" });
  }
};

// Student Login
exports.login = async (req, res) => {
  console.log("🟢 Login API Hit");
  console.log("Received login data:", req.body);

  const { id, password } = req.body;

  if (!id || !password) {
    return res
      .status(400)
      .json({ success: false, message: "ID and Password are required" });
  }

  try {
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Compare plain text password (consider using bcrypt for security)
    if (student.password !== password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Successful login
    res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  console.log("🟢 Reset Password API Hit");

  const { id, otp, newPassword } = req.body;

  if (!id || !otp || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "ID, OTP, and new password are required" });
  }

  try {
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Check OTP and expiration
    if (student.otp !== otp || student.otpExpires < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // Store the new password as plain text (consider using bcrypt)
    student.password = newPassword;
    student.otp = undefined;
    student.otpExpires = undefined;
    await student.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin Login (Static data for warden)
exports.adminLogin = (req, res) => {
  const { username, password } = req.body;

  // Static data for admin (warden)
  const validUsername = "wardensangam";
  const validPassword = "123456";

  if (username === validUsername && password === validPassword) {
    return res.json({ success: true, message: "Admin login successful" });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Invalid admin credentials" });
  }
};
