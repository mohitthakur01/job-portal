// =============================================
// Job Routes - Create, View & Apply for Jobs
// =============================================
import express from "express";
import { createJob, getAllJobs } from "../controllers/job.controller.js";
import { applyForJob } from "../controllers/application.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// POST /api/jobs - Create a job (recruiter only)
router.post("/", protect, authorize("recruiter"), createJob);

// GET /api/jobs - Get all jobs (any logged-in user)
router.get("/", protect, getAllJobs);

// POST /api/jobs/:id/apply - Apply for a job (student only)
router.post("/:id/apply", protect, authorize("student"), applyForJob);

export default router;

