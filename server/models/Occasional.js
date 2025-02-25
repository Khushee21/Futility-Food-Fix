// models/Occasional.js

const mongoose = require('mongoose');

const OccasionalSchema = new mongoose.Schema({
  occasion: {
    type: String,
    required: true,    // Occasion name is required
    trim: true
  },
  image: {
    type: String,
    required: true     // Image URL is required
  },
  menu1: {
    dal: {
      type: String,
      required: true    // Dal name is required
    },
    vegetable: {
      type: String,
      required: true    // Vegetable name is required
    },
    sweet: {
      type: String,
      required: true    // Sweet name is required
    },
    votes: { 
      type: Number, 
      default: 0 
    }
  },
  menu2: {
    dal: {
      type: String,
      required: true
    },
    vegetable: {
      type: String,
      required: true
    },
    sweet: {
      type: String,
      required: true
    },
    votes: { 
      type: Number, 
      default: 0 
    }
  },
  date: {
    type: Date,         // Using Date type for better date handling
    required: true
  }
});

module.exports = mongoose.model('Occasional', OccasionalSchema);
