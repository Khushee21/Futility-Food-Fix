const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    degree: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    parentEmail: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: { type: String, required: true, minlength: 6 },
    otp: { type: String }, // Store OTP for password reset
    otpExpires: { type: Date }, // Expiration time for OTP

    // New field to track voting status
    hasVoted: { type: Boolean, default: false } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
