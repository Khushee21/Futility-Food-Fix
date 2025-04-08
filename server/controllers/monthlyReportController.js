const StudentSubmission = require("../models/StudentSubmission");
const Attendance = require("../models/Attendance");

// Helper function to get total days in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getMonthlyMealStats = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ success: false, message: "Student ID is required" });
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // getMonth is 0-indexed
    const totalDaysInMonth = getDaysInMonth(year, month);

    const startDate = new Date(`${year}-${month.toString().padStart(2, "0")}-01`);
    const endDate = new Date(`${year}-${month.toString().padStart(2, "0")}-${totalDaysInMonth}`);

    // 1️⃣ Count total forms submitted by student this month
    const formSubmittedCount = await StudentSubmission.countDocuments({
      studentId,
      submissionDate: { $gte: startDate, $lte: endDate }
    });

    // 2️⃣ Get presentCount from Attendance DB
    const attendanceData = await Attendance.findOne({ studentId });
    const presentCount = attendanceData?.presentCount || 0;

    // 3️⃣ Calculate meals taken and not taken
    const mealTakenDays = formSubmittedCount - presentCount;
    const mealNotTakenDays = totalDaysInMonth - mealTakenDays;

    return res.status(200).json({
      success: true,
      studentId,
      totalDaysInMonth,
      formSubmittedCount,
      presentCount,
      mealTakenDays,
      mealNotTakenDays,
    });

  } catch (err) {
    console.error("❌ Error in getMonthlyMealStats:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
