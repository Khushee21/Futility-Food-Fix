const mongoose = require('mongoose');

// Use the correct URI for `registeration2` database
const dbURI = process.env.MONGO_URI || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/registeration2'; // replace <username> and <password> with actual credentials

if (!dbURI) {
  console.error('MongoDB URI is not defined in the environment variables');
  process.exit(1);  // Exit if URI is undefined
}

mongoose.set('debug', true);

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB Atlas (registeration2)');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);  // Exit if the connection fails
  }
};

module.exports = connectDB;
