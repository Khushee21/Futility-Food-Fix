const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
  breakfast: {
    type: Boolean,
    default: false,
  },
  lunch: {
    type: Boolean,
    default: false,
  },
  highTea: {
    type: Boolean,
    default: false,
  },
  dinner: {
    type: Boolean,
    default: false,
  },
  markedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
