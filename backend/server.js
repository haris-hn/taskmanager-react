require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// MongoDB Connection
mongoose.connection.on('connected', () => console.log('Mongoose connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.warn('Mongoose disconnected from MongoDB'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Initial connection to MongoDB successful"))
  .catch((err) => {
    console.error("Initial connection to MongoDB failed:", err.message);
    if (err.message.includes('ETIMEDOUT')) {
      console.error("Tip: This often means your IP address is not whitelisted in MongoDB Atlas.");
    }
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`UNIQUE_LOG_ID: ${Date.now()}`);
});
