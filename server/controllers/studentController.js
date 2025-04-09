const Student = require("../models/Student");
const StudentSubmission = require("../models/StudentSubmission");
const moment = require("moment");

// ✅ Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ id: studentId });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

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

// ✅ Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}, "id name");
    res.status(200).json({ success: true, data: students });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// ✅ Get today's meal submissions (Attendance Page)
exports.getTodayMeal = async (req, res) => {
  try {
    const todayStart = moment().startOf("day").toDate();
    const todayEnd = moment().endOf("day").toDate();

    const submissions = await StudentSubmission.find({
      submissionDate: { $gte: todayStart, $lte: todayEnd },
    });

    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    console.error("Error fetching today's submissions:", error);
    res.status(500).json({ success: false, message: "Error fetching submissions" });
  }
};
