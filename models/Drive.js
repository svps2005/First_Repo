import mongoose from "mongoose";

const driveSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true
    },
    jobTitle: {
      type: String,
      required: true
    },
    jobDescription: {
      type: String,
      required: true
    },
    minCGPA: {
      type: Number,
      required: true
    },
    numberOfOpenings: {
      type: Number,
      required: true
    },
    graduationYear: {
      type: Number,
      required: true
    },
    lastDate: {
      type: Date,
      required: true
    },
    eligibleDepartments: {
      type: [String], // Array of departments
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Drive = mongoose.model("Drive", driveSchema);

export default Drive;