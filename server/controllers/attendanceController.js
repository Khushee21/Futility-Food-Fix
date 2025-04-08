const Attendance = require("../models/Attendance");

const updateAttendance = async (req, res) => {
  try {
    const { students } = req.body;

    console.log("📥 Received attendance data:", students);

    if (!Array.isArray(students)) {
      return res.status(400).json({ success: false, message: "Invalid students data format." });
    }

    for (const student of students) {
      let { id, meals, name } = student;

      id = id ? String(id).trim() : null;
      name = name ? String(name).trim() : null;

      console.log(`➡️ Processing student: ${JSON.stringify(student)}`);
      console.log(`🧪 Final studentId to update in DB: ${id}`);

      if (!id || !name || !Array.isArray(meals)) {
        console.warn("⚠️ Skipping invalid student due to missing ID, name or meals:", student);
        continue;
      }

      const allMealsFalse = meals.every(meal => meal === false); // ✅ Check for all false
      const attendedAny = meals.some(meal => meal === true || meal === "late");

      try {
        const updateFields = {
          $setOnInsert: { name, studentId: id }
        };

        if (attendedAny) {
          updateFields.$inc = { presentCount: 1 };
        }

        if (allMealsFalse) {
          if (!updateFields.$inc) updateFields.$inc = {};
          updateFields.$inc.initialCount = 1; // ✅ Updated to match schema
        }

        const updatedStudent = await Attendance.findOneAndUpdate(
          { studentId: id },
          updateFields,
          {
            new: true,
            upsert: true,
            runValidators: true,
            strict: false,
          }
        );

        console.log(`✅ Attendance updated for ${id}:`, updatedStudent);
      } catch (err) {
        console.error(`❌ Error updating student with ID ${id}:`, err.message);
      }
    }

    res.status(200).json({ success: true, message: "Attendance updated successfully." });
  } catch (error) {
    console.error("❌ Error updating attendance:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  updateAttendance,
};
