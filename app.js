import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import driveRoutes from "./routes/driveRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import studentProfileRoutes from "./routes/studentProfileRoutes.js";
import referralRoutes from "./routes/referralRoutes.js";
import mentorshipRoutes from "./routes/mentorshipRoutes.js";  // ✅ ADD THIS

import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/drives", driveRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/student-profile", studentProfileRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/mentorship", mentorshipRoutes);   // ✅ ADD THIS

// Root Route
app.get("/", (req, res) => {
  res.send("PlacementPro API Running...");
});

// Error Middleware (Must Be Last)
app.use(errorHandler);

export default app;