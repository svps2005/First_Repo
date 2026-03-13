import asyncHandler from "express-async-handler";
import Drive from "../models/Drive.js";
import StudentProfile from "../models/StudentProfile.js";
import User from "../models/User.js";

// ================= CREATE DRIVE =================
const createDrive = asyncHandler(async (req, res) => {
  const {
    companyName,
    jobTitle,
    jobDescription,
    minCGPA,
    numberOfOpenings,
    graduationYear,
    lastDate,
    eligibleDepartments
  } = req.body;

  const drive = await Drive.create({
    companyName,
    jobTitle,
    jobDescription,
    minCGPA,
    numberOfOpenings,
    graduationYear,
    lastDate,
    eligibleDepartments,
    createdBy: req.user._id
  });

  res.status(201).json(drive);
});

// ================= GET DRIVES =================
const getDrives = asyncHandler(async (req, res) => {
  if (req.user.role === "student") {
    const profile = await StudentProfile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(400).json({ message: "Complete your profile first" });
    }

    const eligibleDrives = await Drive.find({
      minCGPA: { $lte: profile.cgpa },
      graduationYear: profile.year,
      eligibleDepartments: profile.branch
    });

    return res.json(eligibleDrives);
  }

  const drives = await Drive.find();
  res.json(drives);
});

// ================= ELIGIBLE COUNT =================
const getEligibleStudentCount = asyncHandler(async (req, res) => {
  const drive = await Drive.findById(req.params.id);

  if (!drive) {
    res.status(404);
    throw new Error("Drive not found");
  }

  const eligibleStudents = await StudentProfile.find({
    cgpa: { $gte: drive.minCGPA },
    branch: { $in: drive.eligibleDepartments },
    year: drive.graduationYear
  });

  res.json({
    driveId: drive._id,
    companyName: drive.companyName,
    eligibleCount: eligibleStudents.length
  });
});

// ================= NOTIFY ELIGIBLE =================
const notifyEligibleStudents = asyncHandler(async (req, res) => {
  const drive = await Drive.findById(req.params.id);

  if (!drive) {
    res.status(404);
    throw new Error("Drive not found");
  }

  const eligibleProfiles = await StudentProfile.find({
    cgpa: { $gte: drive.minCGPA },
    branch: { $in: drive.eligibleDepartments },
    year: drive.graduationYear
  });

  const studentIds = eligibleProfiles.map(profile => profile.user);

  const students = await User.find({
    _id: { $in: studentIds }
  });

  // Simulate sending notification
  students.forEach(student => {
    console.log(`Notification sent to: ${student.email}`);
  });

  res.json({
    message: "Notifications sent successfully",
    notifiedCount: students.length
  });
});

// ================= UPDATE DRIVE =================
const updateDrive = asyncHandler(async (req, res) => {
  const drive = await Drive.findById(req.params.id);

  if (!drive) {
    res.status(404);
    throw new Error("Drive not found");
  }

  drive.companyName = req.body.companyName || drive.companyName;
  drive.jobTitle = req.body.jobTitle || drive.jobTitle;
  drive.jobDescription = req.body.jobDescription || drive.jobDescription;
  drive.minCGPA = req.body.minCGPA || drive.minCGPA;
  drive.numberOfOpenings = req.body.numberOfOpenings || drive.numberOfOpenings;
  drive.graduationYear = req.body.graduationYear || drive.graduationYear;
  drive.lastDate = req.body.lastDate || drive.lastDate;
  drive.eligibleDepartments =
    req.body.eligibleDepartments || drive.eligibleDepartments;

  const updatedDrive = await drive.save();
  res.json(updatedDrive);
});

// ================= DELETE DRIVE =================
const deleteDrive = asyncHandler(async (req, res) => {
  const drive = await Drive.findById(req.params.id);

  if (!drive) {
    res.status(404);
    throw new Error("Drive not found");
  }

  await drive.deleteOne();
  res.json({ message: "Drive removed successfully" });
});

export {
  createDrive,
  getDrives,
  getEligibleStudentCount,
  notifyEligibleStudents,
  updateDrive,
  deleteDrive
};