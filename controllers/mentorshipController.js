import asyncHandler from "express-async-handler";
import MentorshipSlot from "../models/MentorshipSlot.js";

// ================= ALUMNI CREATE SLOT =================
const createSlot = asyncHandler(async (req, res) => {
  const { startTime, endTime } = req.body;

  const slot = await MentorshipSlot.create({
    alumni: req.user._id,
    startTime,
    endTime
  });

  res.status(201).json(slot);
});

// ================= STUDENT VIEW AVAILABLE SLOTS =================
const getAvailableSlots = asyncHandler(async (req, res) => {
  const slots = await MentorshipSlot.find({ isBooked: false })
    .populate("alumni", "name email");

  res.json(slots);
});

// ================= STUDENT BOOK SLOT =================
const bookSlot = asyncHandler(async (req, res) => {
  const slot = await MentorshipSlot.findById(req.params.id);

  if (!slot) {
    res.status(404);
    throw new Error("Slot not found");
  }

  if (slot.isBooked) {
    res.status(400);
    throw new Error("Slot already booked");
  }

  slot.isBooked = true;
  slot.bookedBy = req.user._id;

  await slot.save();

  res.json({ message: "Slot booked successfully" });
});

export { createSlot, getAvailableSlots, bookSlot };