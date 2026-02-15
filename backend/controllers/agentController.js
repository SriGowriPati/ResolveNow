const AssignedComplaint = require("../models/AssignedComplaint");
const Complaint = require("../models/Complaint");

// Get assigned complaints for agent
exports.getAssignedComplaints = async (req, res) => {
  try {
    const assignedComplaints = await AssignedComplaint.find({
      agentId: req.user.userId,
    })
      .populate("complaintId")
      .populate("agentId", "fullName email phone");

    res.status(200).json(assignedComplaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update complaint status by agent
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId, status, notes } = req.body;

    // Update assigned complaint
    const assignedComplaint = await AssignedComplaint.findOne({
      complaintId,
      agentId: req.user.userId,
    });

    if (!assignedComplaint) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this complaint" });
    }

    assignedComplaint.status = status;
    assignedComplaint.notes = notes;
    assignedComplaint.updatedAt = Date.now();
    await assignedComplaint.save();

    // Update complaint
    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        status,
        updatedAt: Date.now(),
        resolvedAt: status === "resolved" ? Date.now() : undefined,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Complaint status updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get agent workload
exports.getAgentWorkload = async (req, res) => {
  try {
    const workload = await AssignedComplaint.countDocuments({
      agentId: req.user.userId,
      status: { $in: ["assigned", "in-progress"] },
    });

    res.status(200).json({ workload });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
