// =============================================
// Job Model
// =============================================
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    // Job title (e.g., "Frontend Developer Intern")
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    // Job description
    description: {
      type: String,
      required: [true, "Job description is required"],
    },

    // Company name
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    // Job location (e.g., "Remote", "Mumbai")
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    // Salary for the job
    salary: {
      type: Number,
      required: [true, "Salary is required"],
    },

    // Job type
    jobType: {
      type: String,
      required: [true, "Job type is required"],
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      default: "Full-time",
    },

    // Required experience
    experience: {
      type: String,
      required: [true, "Experience is required"],
    },

    // Last date to apply
    lastDateToApply: {
      type: Date,
      required: [true, "Last date to apply is required"],
    },

    // Reference to the recruiter who created this job
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
