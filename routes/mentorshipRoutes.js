import express from "express";
import {
  createSlot,
  getAvailableSlots,
  bookSlot
} from "../controllers/mentorshipController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Alumni creates slot
router.post("/slots", protect, authorize("alumni"), createSlot);

// Students view slots
router.get("/slots", protect, authorize("student"), getAvailableSlots);

// Student books slot
router.post("/slots/:id/book", protect, authorize("student"), bookSlot);

export default router;