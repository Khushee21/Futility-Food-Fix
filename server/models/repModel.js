const mongoose = require("mongoose");

const repSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true },
    month: { type: String, required: true },
    report: { 
      type: Object, 
      required: true, 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rep", repSchema);