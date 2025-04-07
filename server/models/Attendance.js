const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  presentCount: { type: Number, default: 0 },
});

// ✅ Avoid OverwriteModelError
module.exports = mongoose.models.Student || mongoose.model("Student", attendanceSchema);
