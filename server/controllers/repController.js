  // In repController.js (Backend)
  const Student = require('../models/Student');  // Assuming your Student model is being used to fetch data

  // Get all students
  exports.getAllStudents = async (req, res) => {
    try {
      const students = await Student.find();  // Fetch all students from the database
      res.status(200).json({ success: true, data: students });
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  };