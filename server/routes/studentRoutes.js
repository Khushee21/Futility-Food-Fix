const express = require("express");
const studentController = require("../controllers/studentController");
const StudentSubmission = require("../models/StudentSubmission");
const router = express.Router();

// ✅ Get latest submission (Warden Dashboard)
router.get("/student-submissions", async (req, res) => {
  try {
    const latestSubmission = await StudentSubmission.findOne().sort({ createdAt: -1 });
    res.json(latestSubmission);
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest submission" });
  }
});

router.get("/today", async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0); // today 00:00

    const end = new Date();
    end.setHours(23, 59, 59, 999); // today 23:59

    const submissions = await StudentSubmission.find({
      createdAt: { $gte: start, $lte: end },
    });

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch today's submissions" });
  }
});

// ✅ Get today's meal submissions (Attendance Page)
router.get("/student-submissions/today", studentController.getTodayMeal);

// ✅ Get all students
router.get("/", studentController.getAllStudents);

// ✅ Get student by ID
router.get("/:id", studentController.getStudentById);

module.exports = router;
