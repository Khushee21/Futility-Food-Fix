// In server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes"); // ✅ Import routes for auth (login, reset password, etc.)

const app = express();

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)

// Root route for the server
app.get('/', (req, res) => {
  res.send('Welcome to the Server!');
});

// Use the authentication routes for "/api/students"
app.use("/api/students", authRoutes);

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack trace
  res.status(500).json({ success: false, message: "Something went wrong" });
});

// MongoDB connection
mongoose
  .connect("mongodb+srv://juhi:12345@cluster0.pmhwc.mongodb.net/registeration2")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Database connection error:", err));

// Start the server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
