import express from "express";
import {
  applyToDrive,
  getMyApplications,
  updateApplicationStatus
} from "../controllers/applicationController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Student routes
router.get("/my", protect, authorize("student"), getMyApplications);
router.post("/:driveId", protect, authorize("student"), applyToDrive);

// TPO route
router.put("/:id/status", protect, authorize("tpo"), updateApplicationStatus);

export default router;