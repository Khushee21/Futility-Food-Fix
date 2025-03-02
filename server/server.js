const express = require("express");
const router = express.Router();
const Occasion = require("../models/Occasion");

router.post("/create", async (req, res) => {
  try {
    const { menuName, items } = req.body;

    const newOccasion = new Occasion({ menuName, items });
    await newOccasion.save();


    const io = req.app.locals.io;
    if (io) {
      io.emit("newOccasionMenu", newOccasion); 
    } else {
      console.error("⚠️ io is undefined");
    }

    res.status(201).json({ success: true, message: "Occasion menu created!", data: newOccasion });
  } catch (error) {
    console.error("❌ Error creating occasional menu:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
