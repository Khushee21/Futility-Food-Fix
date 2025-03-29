<<<<<<< HEAD

=======
// routes/voteRoutes.js
>>>>>>> 73320cea2ac5a8f62bddc9736b75e39298181087
const express = require("express");
const router = express.Router();
const { submitVote, getVoteCounts } = require("../controllers/voteController");

// Submit a vote
router.post("/vote", submitVote);

// Get vote counts for today
router.get("/vote-counts", getVoteCounts);

module.exports = router;