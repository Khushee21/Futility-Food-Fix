const bcrypt = require('bcryptjs');
const Student = require('../models/Student');

// Registration controller
const registerStudent = async (req, res) => {
  try {
    const { id, name, degree, email, parentEmail, password } = req.body;

    // Check if the student already exists based on ID or Email
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
      password,
    });

    // Hash the password before saving
    newStudent.password = await bcrypt.hash(password, 10);

    // Save the student to the database
    const savedStudent = await newStudent.save();

    res.status(201).json({
      message: 'Student registered successfully',
      student: savedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering student' });
  }
};

module.exports = {
  registerStudent,
};
