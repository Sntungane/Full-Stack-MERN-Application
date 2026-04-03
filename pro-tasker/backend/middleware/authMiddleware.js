import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware function to protect routes by verifying JWT tokens
const protect = async (req, res, next) => {
  try {

        // Extract the authorization header from the request
    const authHeader = req.headers.authorization;

    // Check if authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, not authorized" });
    }
    // Extract the token by splitting the header and getting the second part
    // Format: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verify the token using the JWT secret from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database using the decoded token ID
    // .select("-password") excludes the password field from the result
    const user = await User.findById(decoded.id).select("-password");

    // If user doesn't exist, return unauthorized error
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach the user object to the request for use in route handlers
    req.user = user;
    // Call next() to proceed to the next middleware or route handler
    next();
  } catch (error) {
        // Catch any errors (invalid token, expired token, etc.)
    return res.status(401).json({ message: "Token failed" });
  }
};
// Export the middleware to be used in protected routes
export default protect;
