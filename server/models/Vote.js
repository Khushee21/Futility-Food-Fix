<<<<<<< HEAD
    // models/Vote.js
=======
// models/Vote.js
>>>>>>> 73320cea2ac5a8f62bddc9736b75e39298181087
const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true }, // Unique student ID
    vote: { type: String, enum: ["good", "bad"], required: true }, // Vote type
    date: { type: Date, default: Date.now }, // Date of the vote
});

module.exports = mongoose.model("Vote", voteSchema);