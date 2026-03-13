import asyncHandler from "express-async-handler";
import PDFDocument from "pdfkit";
import StudentProfile from "../models/StudentProfile.js";
import User from "../models/User.js";

// @desc Create or Update Student Profile
// @route PUT /api/student-profile
// @access Student
const createOrUpdateProfile = asyncHandler(async (req, res) => {
  const { cgpa, skills, branch, year, resume } = req.body;

  let profile = await StudentProfile.findOne({ user: req.user._id });

  if (profile) {
    profile.cgpa = cgpa || profile.cgpa;
    profile.skills = skills || profile.skills;
    profile.branch = branch || profile.branch;
    profile.year = year || profile.year;
    profile.resume = resume || profile.resume;

    await profile.save();
    return res.json(profile);
  }

  profile = await StudentProfile.create({
    user: req.user._id,
    cgpa,
    skills,
    branch,
    year,
    resume
  });

  res.status(201).json(profile);
});

// @desc Get My Profile
// @route GET /api/student-profile
// @access Student
const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await StudentProfile.findOne({ user: req.user._id });

  if (!profile) {
    res.status(404);
    throw new Error("Profile not found");
  }

  res.json(profile);
});

// @desc Generate Resume PDF
// @route GET /api/student-profile/resume
// @access Student
const generateResumePDF = asyncHandler(async (req, res) => {
  const profile = await StudentProfile.findOne({ user: req.user._id });
  const user = await User.findById(req.user._id);

  if (!profile) {
    res.status(400);
    throw new Error("Complete your profile first");
  }

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");

  doc.pipe(res);

  doc.fontSize(22).text("Resume", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Name: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`Branch: ${profile.branch}`);
  doc.text(`Year: ${profile.year}`);
  doc.text(`CGPA: ${profile.cgpa}`);
  doc.moveDown();

  doc.text("Skills:");
  profile.skills.forEach((skill) => {
    doc.text(`- ${skill}`);
  });

  doc.end();
});

export { createOrUpdateProfile, getMyProfile, generateResumePDF };