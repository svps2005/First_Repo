import express from "express";
import {
  createReferral,
  getAllReferrals,
  approveReferral,
  getApprovedReferrals
} from "../controllers/referralController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Alumni posts referral
router.post("/", protect, authorize("alumni"), createReferral);

// TPO views all referrals
router.get("/all", protect, authorize("tpo"), getAllReferrals);

// TPO approves referral
router.put("/:id/approve", protect, authorize("tpo"), approveReferral);

// Students view approved referrals
router.get("/", protect, authorize("student"), getApprovedReferrals);

export default router;