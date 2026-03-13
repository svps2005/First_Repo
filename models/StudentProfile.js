import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    cgpa: {
      type: Number,
      required: true
    },
    skills: {
      type: [String],
      default: []
    },
    branch: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    resume: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);

export default StudentProfile;