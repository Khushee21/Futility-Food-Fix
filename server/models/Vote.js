    // models/Vote.js
const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true }, // Unique student ID
    vote: { type: String, enum: ["good", "bad"], required: true }, // Vote type
    date: { type: Date, default: Date.now }, // Date of the vote
});

module.exports = mongoose.model("Vote", voteSchema);