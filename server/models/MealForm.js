const mongoose = require('mongoose');

const mealFormSchema = new mongoose.Schema(
  {
    myDate: {
      type: String,
      required: true,
      unique: true, 
    },
    Breakfast: {
      type: String,
      required: true,
    },
    Lunch_Daal: {
      type: String,
      required: true,
    },
    Lunch_Sabji: {
      type: String,
      required: true,
    },
    Lunch_Chapati: {
      type: String,
      required: true,
    },
    High_Tea: {
      type: String,
      required: true,
    },
    Dinner_Daal: {
      type: String,
      required: true,      
    },
    Dinner_Sabji: {
      type: String,
      required: true,
    },
    Dinner_Chapati: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const MealForm = mongoose.model('MealForm', mealFormSchema);

module.exports = MealForm;