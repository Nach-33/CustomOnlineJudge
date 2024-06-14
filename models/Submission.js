const mongoose = require("mongoose");

const SubmissionSchema = mongoose.Schema(
  {
    score: {
      type: Number,
      detault: 0,
    },
    penalty: {
      type: Number,
      detault: 0,
    },
    status: {
      type: Number,
      enum: [0, 1],
    },
    message: {
      type: String,
      enum: [
        "Accepted",
        "Time Limit Exceeded",
        "Runtime Error",
        "Wrong Answer",
      ],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    contest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = Submission;
