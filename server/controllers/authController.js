const Student = require("../models/Student");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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

    // Check if student already exists by email or ID
    const existingStudent = await Student.findOne({ $or: [{ email }, { id }] });
    if (existingStudent) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Student with this ID or Email already exists.",
        });
    }

    // Store password as plain text (no hashing)
    const newStudent = new Student({
      id,
      name,
      degree,
      email,
      parentEmail,
      password, // Store the password as plain text
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Student registered successfully",
        student: savedStudent,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error registering student" });
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
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Compare plain text password (no bcrypt)
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

// Request OTP for Password Reset
exports.requestOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP and expiration time in the database
    student.otp = otp;
    student.otpExpires = otpExpires;
    await student.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Error sending email:", error);
        return res
          .status(500)
          .json({ success: false, message: "Error sending OTP email" });
      } else {
        console.log("✅ Email sent:", info.response);
        return res.json({
          success: true,
          message: "OTP sent to your email",
        });
      }
    });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Verify OTP and Reset Password
exports.verifyOtpAndResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email, OTP, and new password are required",
    });
  }

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Check OTP and expiration
    if (student.otp !== otp || student.otpExpires < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // Store the new password as plain text
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
