const mongoose = require("mongoose");

const StudentSubmissionSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  mealSelections: [
    {
      category: String,
      items: [String], // ✅ Stores selected meals for each category
    },
  ],
  myDate: {
    type: String, // ✅ Store as String in YYYY-MM-DD format
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudentSubmission", StudentSubmissionSchema);
