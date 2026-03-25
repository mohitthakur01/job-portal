// =============================================
// Auth Routes - Register & Login
// =============================================
import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// POST /api/auth/register - Create a new account
router.post("/register", register);

// POST /api/auth/login - Login and get token
router.post("/login", login);

export default router;
