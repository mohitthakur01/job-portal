// =============================================
// Auth Middleware - Protects routes using JWT
// =============================================
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware: Verify JWT token from request header
export const protect = async (req, res, next) => {
  try {
    // 1. Get token from "Authorization" header (format: "Bearer <token>")
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token provided. Please login." });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find the user and attach to request object
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user; // Now we can access req.user in any protected route
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

// Middleware: Check if user has a specific role
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `Access denied. Only ${roles.join(", ")} can access this.` });
    }
    next();
  };
};
