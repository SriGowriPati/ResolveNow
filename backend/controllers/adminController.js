const User = require("../models/User");
const Complaint = require("../models/Complaint");
const AssignedComplaint = require("../models/AssignedComplaint");

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ userType: "customer" });
    const totalAgents = await User.countDocuments({ userType: "agent" });
    const totalComplaints = await Complaint.countDocuments();
    const openComplaints = await Complaint.countDocuments({
      status: "open",
    });
    const resolvedComplaints = await Complaint.countDocuments({
      status: "resolved",
    });

    res.status(200).json({
      totalUsers,
      totalAgents,
      totalComplaints,
      openComplaints,
      resolvedComplaints,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all complaints with pagination
exports.getAllComplaints = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};
    if (status) filter.status = status;

    const complaints = await Complaint.find(filter)
      .populate("userId", "fullName email")
      .populate("assignedAgent", "fullName email")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Complaint.countDocuments(filter);

    res.status(200).json({
      complaints,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reassign complaint
exports.reassignComplaint = async (req, res) => {
  try {
    const { complaintId, newAgentId, agentName } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { 
        assignedAgent: newAgentId, 
        status: "assigned",
        updatedAt: Date.now() 
      },
      { new: true }
    );

    // Update or create assigned complaint record
    await AssignedComplaint.updateOne(
      { complaintId },
      { agentId: newAgentId, agentName, status: "assigned" },
      { upsert: true }
    );

    res.status(200).json({
      message: "Complaint assigned successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get agent stats
exports.getAgentStats = async (req, res) => {
  try {
    const agents = await User.find({ userType: "agent" });

    const agentStats = await Promise.all(
      agents.map(async (agent) => {
        const assigned = await AssignedComplaint.countDocuments({
          agentId: agent._id,
          status: { $in: ["assigned", "in-progress"] },
        });
        const resolved = await AssignedComplaint.countDocuments({
          agentId: agent._id,
          status: "resolved",
        });

        return {
          agentId: agent._id,
          agentName: agent.fullName,
          assigned,
          resolved,
        };
      })
    );

    res.status(200).json(agentStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
