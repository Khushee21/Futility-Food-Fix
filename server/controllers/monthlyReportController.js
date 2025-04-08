// controllers/monthlyReportController.js
const Attendance = require('../models/Attendance');

// Function to fetch monthly report data
exports.getMonthlyReport = async (req, res) => {
  try {
    const attendanceData = await Attendance.find();
    if (!attendanceData || attendanceData.length === 0) {
      return res.status(404).json({ message: "No attendance data available" });
    }

    // Calculate taken and non-taken days
    const reportData = attendanceData.map((record) => {
      // Assuming "presentCount" is the number of days present, you can adjust logic as needed
      return {
        studentId: record.studentId,
        name: record.name,
        taken: record.presentCount, // Adjust this logic if needed
        nonTaken: 30 - record.presentCount, // Assuming a month with 30 days
      };
    });

    return res.status(200).json(reportData);
  } catch (err) {
    console.error("Error fetching monthly report:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
