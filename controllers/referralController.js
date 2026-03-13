import asyncHandler from "express-async-handler";
import Referral from "../models/Referral.js";

// ================= ALUMNI CREATE REFERRAL =================
const createReferral = asyncHandler(async (req, res) => {
  const { companyName, jobTitle, jobDescription, applyLink } = req.body;

  const referral = await Referral.create({
    companyName,
    jobTitle,
    jobDescription,
    applyLink,
    postedBy: req.user._id
  });

  res.status(201).json(referral);
});

// ================= TPO VIEW ALL REFERRALS =================
const getAllReferrals = asyncHandler(async (req, res) => {
  const referrals = await Referral.find().populate("postedBy", "name email");
  res.json(referrals);
});

// ================= TPO APPROVE REFERRAL =================
const approveReferral = asyncHandler(async (req, res) => {
  const referral = await Referral.findById(req.params.id);

  if (!referral) {
    res.status(404);
    throw new Error("Referral not found");
  }

  referral.status = "approved";
  await referral.save();

  res.json({ message: "Referral approved successfully" });
});

// ================= STUDENT VIEW APPROVED =================
const getApprovedReferrals = asyncHandler(async (req, res) => {
  const referrals = await Referral.find({ status: "approved" })
    .populate("postedBy", "name email");

  res.json(referrals);
});

export {
  createReferral,
  getAllReferrals,
  approveReferral,
  getApprovedReferrals
};