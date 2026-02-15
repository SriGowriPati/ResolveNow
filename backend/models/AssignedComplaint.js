const mongoose = require("mongoose");

const assignedComplaintSchema = new mongoose.Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    complaintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },
    agentName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["assigned", "in-progress", "resolved", "closed"],
      default: "assigned",
    },
    notes: {
      type: String,
    },
    assignedAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "assigned_complaint" }
);

module.exports = mongoose.model("AssignedComplaint", assignedComplaintSchema);
