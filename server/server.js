require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5066;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yourdbname"; // Replace with your DB name

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow frontend on port 5173
  credentials: true,  // Allow credentials like cookies
};

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors(corsOptions)); // Apply the CORS middleware with the specific options

// Root route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Server!");
});

// Use authentication routes
app.use("/api/auth", authRoutes);

// Handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit the app if DB connection fails
  });

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
