import express from "express";
import {
  createOrUpdateProfile,
  getMyProfile,
  generateResumePDF
} from "../controllers/studentProfileController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create / Update + Get Profile
router
  .route("/")
  .put(protect, authorize("student"), createOrUpdateProfile)
  .get(protect, authorize("student"), getMyProfile);

// ✅ Resume PDF Route
router.get("/resume", protect, authorize("student"), generateResumePDF);

export default router;