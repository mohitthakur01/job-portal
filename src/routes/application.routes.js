// =============================================
// Application Routes - View Applications
// =============================================
import express from "express";
import { getMyApplications } from "../controllers/application.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// GET /api/applications - Get my applications (student only)
router.get("/", protect, authorize("student"), getMyApplications);

export default router;
