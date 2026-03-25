// =============================================
// Application Controller - Apply & View
// =============================================
import Application from "../models/Application.js";
import Job from "../models/Job.js";

// ---- APPLY FOR A JOB ----
// POST /api/jobs/:id/apply (Only student can apply)
export const applyForJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const studentId = req.user._id;
    const { resumeURL, coverLetter } = req.body;

    // 1. Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    // 2. Check if already applied (compound unique index will also catch this)
    const existingApplication = await Application.findOne({ job: jobId, student: studentId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job." });
    }

    // 3. Create application
    const application = await Application.create({
      job: jobId,
      student: studentId,
      recruiter: job.createdBy,
      resumeURL,
      coverLetter,
    });

    res.status(201).json({
      message: "Application submitted successfully!",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ---- GET MY APPLICATIONS ----
// GET /api/applications (Student sees their applications)
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id })
      .populate("job", "title companyName location") // Show job details
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
