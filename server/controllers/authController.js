const Student = require('../models/Student');
const User = require('../models/User');  // Assuming you have a User model to check against

// Student Registration
exports.registerStudent = async (req, res) => {
  try {
    const { id, name, degree, email, parentEmail, password } = req.body;

    // Check if required fields are missing
    if (!id || !email || !password || !name || !degree) {
      return res.status(400).json({ success: false, message: 'All fields (ID, Name, Degree, Email, Password) are required' });
    }

    // Check if the ID and email entered already exist in the 'users' collection
    const existingUser = await User.findOne({ $and: [{ id }, { email }] });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: 'ID and Email must match an existing user in the system.' });
    }

    // Check if student already exists by email or ID in the 'students' collection
    const existingStudent = await Student.findOne({ $or: [{ email }, { id }] });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: 'Student with this ID or Email already exists.' });
    }

    // Store password as plain text (no hashing - should be hashed in production)
    const newStudent = new Student({
      id,
      name,
      degree,
      email,
      parentEmail,
      password, // Store the password as plain text (in production, hash it)
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();
    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      student: savedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error registering student' });
  }
};

// Student Login
exports.login = async (req, res) => {
  console.log("🟢 Login API Hit");
  console.log("Received login data:", req.body); // Log the received body

  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ success: false, message: 'ID and Password are required' });
  }

  try {
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Compare plain text password (no bcrypt)
    if (student.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Successful login
    res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
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
    return res.status(401).json({ success: false, message: "Invalid admin credentials" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { id, newPassword } = req.body;

  if (!id || !newPassword) {
    return res.status(400).json({ success: false, message: 'ID and new password are required' });
  }

  try {
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Store the new password as plain text
    student.password = newPassword;
    await student.save();

    res.json({ success: true, message: 'Password reset successful' });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
