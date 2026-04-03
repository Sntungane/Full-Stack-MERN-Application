import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Helper function to generate a JWT token for a user
const generateToken = (id) => {
    // Sign a token with the user ID, using the JWT secret from environment variables
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // expires in "______"
    expiresIn: "30d",
  });
};
// REGISTER (Creates a new user account)
export const registerUser = async (req, res) => {
    // Extract name, email, and password from the request body
  const { name, email, password } = req.body;

  // Check if a user with this email already exists
  const userExists = await User.findOne({ email });
  // Return error if user already exists
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
 // Create a new user with the provided credentials
  // Password is automatically hashed by the User model's pre-save middleware
  const user = await User.create({ name, email, password });

  // Return the new user's data and a JWT token with 201 (Created) status
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};
// LOGIN (Authenticates a user and returns a token)
export const loginUser = async (req, res) => {
    // Extract email and password from the request body
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
        // Return 401 error if email or password is incorrect
    res.status(401).json({ message: "Invalid credentials" });
  }
};
