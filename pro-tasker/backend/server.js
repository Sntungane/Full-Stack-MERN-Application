import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

// Load environment variables from .env file into process.env
dotenv.config();

const app = express();
// connected to MongoDB
connectDB();

// Enable CORS to allow requests from other domains
app.use(cors());
// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Mount authentication routes at /api/auth
app.use("/api/auth", authRoutes);

// Mount project routes at /api/projects
app.use("/api/projects", projectRoutes);

// Basic health check endpoint that returns a simple message to confirm the server is running
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Get the port from environment variables, default to 5050 if not set
const PORT = process.env.PORT || 5050;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});