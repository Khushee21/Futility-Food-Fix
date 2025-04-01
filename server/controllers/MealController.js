const Meal = require("../models/Meal");

// Controller to handle meal submission
exports.createMeal = async (req, res) => {
  try {
    const mealData = new Meal(req.body);
    await mealData.save();
    res.status(201).json({ message: "Meal data submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit meal data!" });
  }
};

// New controller to fetch and format meal options for a specific date
exports.getMealOptionsByDate = async (req, res) => {
  try {
    const { date } = req.params;  // Extract date from URL
    const mealData = await Meal.findOne({ myDate: date });  // Find by date

    if (!mealData) {
      return res.status(404).json({ message: 'No meal data found for this date' });
    }

    const formattedData = {
      breakfast: mealData.Breakfast,
      lunch: `${mealData.Lunch_Daal}, ${mealData.Lunch_Sabji}, ${mealData.Lunch_Chapati}`,
      highTea: mealData.High_Tea,
      dinner: `${mealData.Dinner_Daal}, ${mealData.Dinner_Sabji}, ${mealData.Dinner_Chapati}`,
    };

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching meal data by date:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
