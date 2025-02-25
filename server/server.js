require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const authRoutes = require("./routes/authRoutes");
const occasionRoutes = require("./routes/occasionRoutes");

const app = express();
const PORT = process.env.PORT || 5066;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/femine-food-fix";


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


app.get("/", (req, res) => {
  res.send("Welcome to the Server!");
});


app.use("/api/auth", authRoutes);
app.use("/api/occasional", occasionRoutes);


app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});


app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


app.locals.io = io;

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
