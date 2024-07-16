const mongoose = require("mongoose");

const SubmissionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },
    score: {
      type: Number,
      detault: 0,
    },
    penalty: {
      type: Number,
      detault: 0,
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
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = Submission;
