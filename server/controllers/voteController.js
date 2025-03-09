// controllers/voteController.js
const Vote = require("../models/Vote");
const cron = require("node-cron");

// Function to delete all votes at the end of the day
const deleteVotesAtEndOfDay = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const nextDay = new Date(today);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(0, 0, 0, 0);

        // Delete all votes from the current day
        await Vote.deleteMany({
            date: { $gte: today, $lt: nextDay },
        });

        console.log("All votes deleted for the day");
    } catch (error) {
        console.error("Error deleting votes at the end of the day:", error);
    }
};

// Schedule the deletion task at 23:59:59 every day
cron.schedule("59 59 23 * * *", () => {
    deleteVotesAtEndOfDay();
});

// Submit a vote
const submitVote = async (req, res) => {
    const { studentId, vote } = req.body;

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingVote = await Vote.findOne({ studentId, date: { $gte: today } });
        if (existingVote) {
            return res.status(400).json({ success: false, message: "You have already voted today." });
        }

        const newVote = new Vote({ studentId, vote });
        await newVote.save();

        res.status(201).json({ success: true, message: "Vote recorded successfully." });
    } catch (error) {
        console.error("Error submitting vote:", error);
        res.status(500).json({ success: false, message: "Error recording vote.", error: error.message });
    }
};

// Get vote counts for today
const getVoteCounts = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to the start of the day

        const goodVotes = await Vote.countDocuments({
            vote: "good",
            date: { $gte: today },
        });
        const badVotes = await Vote.countDocuments({
            vote: "bad",
            date: { $gte: today },
        });

        res.status(200).json({
            success: true,
            goodVotes,
            badVotes,
        });
    } catch (error) {
        console.error("Error fetching vote counts:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching vote counts.",
            error: error.message,
        });
    }
};

module.exports = { submitVote, getVoteCounts };