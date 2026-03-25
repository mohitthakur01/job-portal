// =============================================
// User Model
// =============================================
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // User's email (must be unique)
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Hashed password
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    // Role: either "student" or "recruiter"
    role: {
      type: String,
      enum: ["student", "recruiter"],
      default: "student",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const User = mongoose.model("User", userSchema);
export default User;
