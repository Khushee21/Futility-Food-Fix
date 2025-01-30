const express = require('express');
const Student = require('../models/User');  // Import the Student model
const router = express.Router();  // Create a new Router instance

// POST route to register a student
router.post('/', async (req, res) => {
  try {
    // Check if the student already exists based on email or student ID
    const existingStudent = await Student.findOne({
      $or: [{ email: req.body.email }, { id: req.body.id }]
    });

    if (existingStudent) {
      return res.status(400).json({ error: 'Student with this ID or Email already exists.' });
    }

    // Create a new student document using the data from the request body
    const newStudent = new Student(req.body);

    // Save the student to the database
    await newStudent.save();

    // Send a success response with the student data
    res.status(201).json({ message: 'Student registered successfully', student: newStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registering student' });
  }
});

module.exports = router;