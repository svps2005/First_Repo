import express from "express";
import {
  createDrive,
  getDrives,
  updateDrive,
  deleteDrive,
  getEligibleStudentCount,
  notifyEligibleStudents      // ✅ ADD THIS
} from "../controllers/driveController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Drive
router.post("/", protect, authorize("tpo"), createDrive);

// View Drives
router.get("/", protect, getDrives);

// Eligible Count
router.get(
  "/:id/eligible-count",
  protect,
  authorize("tpo"),
  getEligibleStudentCount
);

// ✅ Notify Eligible Students
router.post(
  "/:id/notify-eligible",
  protect,
  authorize("tpo"),
  notifyEligibleStudents
);

// Update & Delete
router.put("/:id", protect, authorize("tpo"), updateDrive);
router.delete("/:id", protect, authorize("tpo"), deleteDrive);

export default router;