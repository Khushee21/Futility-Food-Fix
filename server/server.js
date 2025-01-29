require('dotenv').config();  // Make sure this is at the top

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');  // Correct route import
const { PORT } = require('./config/config');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/',(req,res)=>{
res.send("welcome to server");
});

// Connect to MongoDB
connectDB();

// Use the authentication routes
app.use('/api/auth', authRoutes);  // Prefix the routes with /api/auth

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
