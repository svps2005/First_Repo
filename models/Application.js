import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    drive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drive",
      required: true
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Aptitude Cleared",
        "Interview Scheduled",
        "Selected",
        "Rejected"
      ],
      default: "Applied"
    }
  },
  {
    timestamps: true
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;