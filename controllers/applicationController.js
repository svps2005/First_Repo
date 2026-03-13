import asyncHandler from "express-async-handler";
import Application from "../models/Application.js";

// @desc Apply to Drive
// @route POST /api/applications/:driveId
// @access Student
const applyToDrive = asyncHandler(async (req, res) => {
  const driveId = req.params.driveId;

  const alreadyApplied = await Application.findOne({
    student: req.user._id,
    drive: driveId
  });

  if (alreadyApplied) {
    res.status(400);
    throw new Error("You already applied to this drive");
  }

  const application = await Application.create({
    student: req.user._id,
    drive: driveId
  });

  res.status(201).json(application);
});

// @desc Get My Applications
// @route GET /api/applications/my
// @access Student
const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({
    student: req.user._id
  }).populate("drive", "companyName role package");

  res.json(applications);
});

// @desc Update Application Status
// @route PUT /api/applications/:id/status
// @access TPO
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const application = await Application.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  application.status = status;
  await application.save();

  res.json(application);
});

export { applyToDrive, getMyApplications, updateApplicationStatus };