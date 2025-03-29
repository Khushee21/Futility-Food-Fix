const Attendance = require("../models/Attendance");
const StudentSubmission = require("../models/StudentSubmission");

// Mark attendance
const markAttendance = async (req, res) => {
  try {
    const { studentId, studentName, date, submitted, breakfast, lunch, highTea, dinner } = req.body;

    if (!studentId || !studentName || !date) {
      return res.status(400).json({ success: false, message: "Student ID, Name, and Date are required" });
    }

    const existing = await Attendance.findOne({ studentId, date });
    if (existing) {
      return res.status(400).json({ success: false, message: "Attendance already marked for today" });
    }

    const attendance = await Attendance.create({
      studentId,
      studentName,
      date,
      submitted,
      breakfast,
      lunch,
      highTea,
      dinner,
    });

    res.status(201).json({ success: true, message: "Attendance marked", data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to mark attendance", error: error.message });
  }
};

// Get attendance of a specific student


const getLatestStudentSubmission = async (req, res) => {
  try {
    const latestSubmission = await StudentSubmission.findOne().sort({ submissionDate: -1 });
    if (!latestSubmission) {
      return res.status(404).json({ success: false, message: "No submissions found" });
    }
    res.status(200).json({ success: true, data: latestSubmission });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch latest submission", error: error.message });
  }
};



// Get all students' attendance
const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().sort({ date: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch attendance", error: error.message });
  }
};

module.exports = {
  markAttendance,
  getStudentAttendance,
  getAllAttendance,
  getLatestStudentSubmission  ,
};
