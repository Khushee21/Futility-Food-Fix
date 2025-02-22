const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true // Ensure the ID is unique
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, // Convert email to lowercase
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'] // Email validation
  },
  name: { 
    type: String, 
    required: true 
  },
  // Add any other fields that may be relevant for your users, such as:
  role: { 
    type: String, 
    default: 'user' // Default role can be 'user', but you may have other roles like 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set the creation date
  }
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
