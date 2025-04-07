const mongoose = require("mongoose");

const StudentSubmissionSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    date: { type: String, required: true },
    meals: {
      breakfast: { type: Boolean, default: false },
      lunch: { type: Boolean, default: false },
      highTea: { type: Boolean, default: false },
      dinner: { type: Boolean, default: false },
    },
    submissionDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentSubmission", StudentSubmissionSchema);
