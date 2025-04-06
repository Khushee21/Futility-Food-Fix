const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  presentCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
