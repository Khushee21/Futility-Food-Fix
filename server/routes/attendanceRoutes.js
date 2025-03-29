const express = require("express");
const router = express.Router();
const {
  markAttendance,
  getStudentAttendance,
  getAllAttendance,
} = require("../controllers/attendanceController");

// Mark attendance
router.post("/mark", markAttendance);

// Get specific student attendance
router.get("/:studentId", getStudentAttendance);
router.get("/student-submissions/latest", getLatestStudentSubmission);


// Get all attendance
router.get("/", getAllAttendance);

module.exports = router;
