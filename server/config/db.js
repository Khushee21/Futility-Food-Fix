const mongoose = require('mongoose');

const dbURI = process.env.MONGO_URI;  // Access Mongo URI from environment variable

if (!dbURI) {
  console.error('MongoDB URI is not defined in the environment variables');
  process.exit(1);  // Exit if URI is undefined
}

mongoose.set('debug', true);

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB Connection Failed:', err.message);
    process.exit(1);  // Exit if the connection fails
  }
};

module.exports = connectDB;
