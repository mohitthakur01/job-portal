// =============================================
// Job Controller - Create & Get Jobs
// =============================================
import Job from "../models/Job.js";

// ---- CREATE JOB ----
// POST /api/jobs (Only recruiter can create)
export const createJob = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      companyName, 
      location, 
      salary, 
      jobType, 
      experience, 
      lastDateToApply 
    } = req.body;

    // Create a new job with the recruiter's ID
    const job = await Job.create({
      title,
      description,
      companyName,
      location,
      salary,
      jobType,
      experience,
      lastDateToApply,
      createdBy: req.user._id, // From auth middleware
    });

    res.status(201).json({
      message: "Job created successfully!",
      job,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ---- GET ALL JOBS ----
// GET /api/jobs (Any logged-in user can view)
export const getAllJobs = async (req, res) => {
  try {
    // Find all jobs and populate the recruiter's name & email
    const jobs = await Job.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
