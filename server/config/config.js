// Load environment variables
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5066,
  MONGO_URI: process.env.MONGO_URI,
};
