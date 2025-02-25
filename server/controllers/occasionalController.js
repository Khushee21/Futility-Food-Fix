// Importing the Occasional model
const Occasional = require('../models/Occasional');
const mongoose = require('mongoose');

// Controller function to create a new occasional menu
const createOccasional = async (req, res) => {
    try {
      const { occasion, menu1, menu2, date } = req.body;
      if (!occasion || !menu1 || !menu2) {
        return res.status(400).json({
          success: false,
          message: 'Please provide occasion, menu1, and menu2 details'
        });
      }
  
      const newOccasional = new Occasional(req.body);
      await newOccasional.save();
  
      // Emit the new occasion to all connected clients
      const io = req.app.locals.io;
      io.emit("newOccasion", newOccasional);
  
      res.status(201).json({ 
        success: true,
        message: 'Occasional menu created successfully',
        data: newOccasional 
      });
    } catch (error) {
      console.error('Error creating occasional menu:', error.message);
      res.status(500).json({ 
        success: false,
        error: 'Failed to create occasional menu' 
      });
    }
  };
  
// Vote for a Menu Item
const voteMenu = async (req, res) => {
    try {
      const { occasionId, menuNumber } = req.body;
      const voteField = menuNumber === 1 ? 'menu1.votes' : 'menu2.votes';
  
      const updatedOccasion = await Occasional.findByIdAndUpdate(
        occasionId, 
        { $inc: { [voteField]: 1 } }, 
        { new: true }
      );
  
      if (!updatedOccasion) {
        return res.status(404).json({
          success: false,
          message: 'Occasion not found'
        });
      }
  
      const io = req.app.locals.io;
      console.log("✅ Emitting voteUpdate event with data:", updatedOccasion);
      io.emit("voteUpdate", updatedOccasion); // Emit event with updated data
  
      res.status(200).json({ 
        success: true,
        message: 'Vote recorded successfully',
        data: updatedOccasion 
      });
    } catch (error) {
      console.error('Error voting for menu:', error.message);
      res.status(500).json({ 
        success: false,
        error: 'Failed to vote for menu' 
      });
    }
  };
  
  
// Get Voting Results
const getResults = async (req, res) => {
    try {
        const occasions = await Occasional.find();

        if (occasions.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No occasions found'
            });
        }

        const results = occasions.map(occasion => {
            const { menu1, menu2 } = occasion;
            const winningMenu = menu1.votes > menu2.votes ? 'menu1' : 'menu2';
            return {
                occasion: occasion.occasion,
                winningMenu,
                votes: winningMenu === 'menu1' ? menu1.votes : menu2.votes,
                menuDetails: winningMenu === 'menu1' ? menu1 : menu2
            };
        });

        res.status(200).json({
            success: true,
            message: 'Voting results retrieved successfully',
            data: results
        });
    } catch (error) {
        console.error('Error fetching voting results:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch voting results'
        });
    }
};

// Notify Students (Placeholder for Email Functionality)
const notifyStudents = async (req, res) => {
    try {
        // Add your email sending logic here (e.g., using nodemailer)
        res.status(200).json({ 
            success: true,
            message: 'Notification sent to students successfully' 
        });
    } catch (error) {
        console.error('Error notifying students:', error.message);
        res.status(500).json({ 
            success: false,
            error: 'Failed to send notifications' 
        });
    }
};

// New Controller function to get the current occasion
const getOccasion = async (req, res) => {
    try {
        // Get the start and end of today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Find an occasion whose date is within today's range
        const occasion = await Occasional.findOne({
            date: { $gte: startOfDay, $lte: endOfDay }
        });
        
        if (!occasion) {
            return res.status(404).json({ success: false, message: "No occasion found for today" });
        }
        res.status(200).json({ success: true, data: occasion });
    } catch (error) {
        console.error("Error fetching occasion data:", error.message);
        res.status(500).json({ success: false, error: "Failed to fetch occasion data" });
    }
};


// Exporting all controller functions, including getOccasion
module.exports = { createOccasional, voteMenu, getResults, notifyStudents, getOccasion };
