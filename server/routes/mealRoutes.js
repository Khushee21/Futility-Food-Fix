const express = require('express');
const MealForm = require('../models/MealForm');  // Import the MealForm model
const router = express.Router();

// Route to get today's meal options
router.get('/meal-options', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];  // Get today's date (YYYY-MM-DD)
    const mealData = await MealForm.findOne({ myDate: today });

    if (!mealData) {
      return res.status(404).json({ success: false, message: 'No meal data found for today' });
    }

    const formattedMealData = {
      breakfast: mealData.Breakfast,
      lunch: `${mealData.Lunch_Daal}, ${mealData.Lunch_Sabji}, ${mealData.Lunch_Chapati}`,
      highTea: mealData.High_Tea,
      dinner: `${mealData.Dinner_Daal}, ${mealData.Dinner_Sabji}, ${mealData.Dinner_Chapati}`,
    };

    res.json(formattedMealData);
  } catch (error) {
    console.error("Error fetching meal data:", error);
    res.status(500).json({ success: false, message: 'Error fetching meal data' });
  }
});

// New route to fetch meal data for a specific date
// New route to fetch meal data for a specific date
router.get('/meal-options/:date', async (req, res) => {
    const { date } = req.params; // Date parameter
    try {
      const mealData = await MealForm.findOne({ myDate: date });
      
      if (!mealData) {
        return res.status(404).json({ success: false, message: `No meal data found for ${date}` });
      }
  
      // Format the data
      const formattedMealData = {
        breakfast: mealData.Breakfast,
        lunch: `${mealData.Lunch_Daal}, ${mealData.Lunch_Sabji}, ${mealData.Lunch_Chapati}`,
        highTea: mealData.High_Tea,
        dinner: `${mealData.Dinner_Daal}, ${mealData.Dinner_Sabji}, ${mealData.Dinner_Chapati}`,
      };
  
      res.json(formattedMealData);
    } catch (error) {
      console.error("Error fetching meal data:", error);
      res.status(500).json({ success: false, message: 'Error fetching meal data' });
    }
  });
  

module.exports = router;
