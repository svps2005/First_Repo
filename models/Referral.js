import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
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
    applyLink: {
      type: String,
      required: true
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Referral = mongoose.model("Referral", referralSchema);

export default Referral;