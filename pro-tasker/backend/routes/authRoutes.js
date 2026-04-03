import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Define POST route for user registration
// POST /api/auth/register - Creates a new user account
router.post("/register", registerUser);

// Define POST route for user login
// POST /api/auth/login - Authenticates a user and returns a token
router.post("/login", loginUser);

export default router;
