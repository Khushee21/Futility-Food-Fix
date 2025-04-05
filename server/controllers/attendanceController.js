const Student = require("../models/Attendance"); // Make sure this model has studentId and presentCount

const updateAttendance = async (req, res) => {
  try {
    const { students } = req.body; // you're sending this from frontend

    console.log("📥 Received attendance data:", students);

    for (const student of students) {
      const { id, meals } = student;
      const attendedAny = meals.some((meal) => meal === true || meal === "late");

      if (attendedAny) {
        const updatedStudent = await Student.findOneAndUpdate(
          { studentId: String(id) },
          { $inc: { presentCount: 1 } },
          { new: true }
        );
        console.log(`✅ Updated ${id}:`, updatedStudent);
      }
    }

    res.status(200).json({ success: true, message: "Attendance updated successfully." });
  } catch (error) {
    console.error("❌ Error updating attendance:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Only one export
module.exports = {
  updateAttendance,
};
