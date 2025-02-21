const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const User = require('../models/User');

// Student Registration
exports.registerStudent = async (req, res) => {
  try {
    const { id, name, degree, email, parentEmail, password } = req.body;

    // Check if all required fields are provided
    if (!id || !name || !degree || !email || !parentEmail || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields (ID, Name, Degree, Email, Parent Email, Password) are required' 
      });
    }

    // Check if the ID and Email exist in the 'users' collection
    const existingUser = await User.findOne({ id, email });
    if (!existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID and Email must match an existing user in the system.' 
      });
    }

    // Check if student already exists in the 'students' collection
    const existingStudent = await Student.findOne({ $or: [{ email }, { id }] });
    if (existingStudent) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student with this ID or Email already exists.' 
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the hashed password and other details
    const newStudent = new Student({
      id,
      name,
      degree,
      email,
      parentEmail,
      password: hashedPassword,
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();
    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      student: savedStudent,
    });
  } catch (error) {
    console.error('❌ Error in registration:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error registering student' 
    });
  }
};

// Student Login
exports.login = async (req, res) => {
  const { id, password } = req.body;

  // Check if both ID and Password are provided
  if (!id || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'ID and Password are required' 
    });
  }

  try {
    // Find the student by ID
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Successful login
    res.json({ 
      success: true, 
      message: 'Login successful' 
    });
  } catch (err) {
    console.error('❌ Error in login:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};
