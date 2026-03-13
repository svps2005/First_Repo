import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// 👇 ADD THESE BELOW PROFILE

router.get("/student-only", protect, authorize("student"), (req, res) => {
  res.json({ message: "Welcome Student" });
});

router.get("/tpo-only", protect, authorize("tpo"), (req, res) => {
  res.json({ message: "Welcome TPO" });
});

export default router;