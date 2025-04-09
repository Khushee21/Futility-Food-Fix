const StudentSubmission = require("../models/StudentSubmission");
const Attendance = require("../models/Attendance");

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getMonthlyMealStats = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required"
      });
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const totalDaysInMonth = getDaysInMonth(year, month);

    const startDate = new Date(`${year}-${month.toString().padStart(2, "0")}-01`);
    const endDate = new Date(`${year}-${month.toString().padStart(2, "0")}-${totalDaysInMonth}`);

 
    const formSubmittedCount = await StudentSubmission.countDocuments({
      studentId,
      submissionDate: { $gte: startDate, $lte: endDate }
    });

    const attendanceData = await Attendance.findOne({ studentId });
    const presentCount = attendanceData?.presentCount || 0;


    const mealTakenDays = formSubmittedCount - presentCount;
    const mealNotTakenDays = totalDaysInMonth - mealTakenDays;


    return res.status(200).json({
      success: true,
      studentId,
      month,
      year,
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

module.exports = {
  getMonthlyMealStats,
  getDaysInMonth
};
