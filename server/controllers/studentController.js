const Student = require("../models/Student");

// Fetch student data by ID
exports.getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ id: studentId });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Exclude sensitive data like password and OTP
    const studentData = {
      id: student.id,
      name: student.name,
      degree: student.degree,
      email: student.email,
      parentEmail: student.parentEmail,
      hasVoted: student.hasVoted,
    };

    res.status(200).json({ success: true, data: studentData });
  } catch (err) {
    console.error("Error fetching student data:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};