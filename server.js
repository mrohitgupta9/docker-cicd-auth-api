const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// Database Connection
if (process.env.NODE_ENV !== "test" && process.env.MONGO_URI) {
  connectDB();
}

// Basic Endpoints
app.get("/", (req, res) => {
  res.status(200).send("CI/CD Pipeline Engine is Live & Running Perfectly!");
});

app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "UP", message: "CI/CD Pipeline Updated Successfully!" });
});

// Mounting Auth Routes
app.use("/api/auth", authRoutes);

// Fallback Route for Undefined Paths
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
