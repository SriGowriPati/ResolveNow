const Complaint = require("../models/Complaint");
const AssignedComplaint = require("../models/AssignedComplaint");
const { validationResult } = require("express-validator");

// Create complaint
exports.createComplaint = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      description,
      category,
      priority,
    } = req.body;

    const complaint = new Complaint({
      userId: req.user.userId,
      name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      description,
      category,
      priority: priority || "medium",
      status: "open",
    });

    await complaint.save();

    res.status(201).json({
      message: "Complaint registered successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all complaints for a user
exports.getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.user.userId,
    }).populate("assignedAgent", "fullName email phone");

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get complaint by ID
exports.getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findById(id).populate(
      "assignedAgent",
      "fullName email phone"
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update complaint
exports.updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolution, rating, feedback } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      {
        status,
        resolution,
        rating,
        feedback,
        updatedAt: Date.now(),
        resolvedAt: status === "resolved" ? Date.now() : undefined,
      },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({
      message: "Complaint updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all complaints (admin/agent)
exports.getAllComplaints = async (req, res) => {
  try {
    const { status, priority } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const complaints = await Complaint.find(filter)
      .populate("userId", "fullName email phone")
      .populate("assignedAgent", "fullName email phone");

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign complaint to agent
exports.assignComplaint = async (req, res) => {
  try {
    const { complaintId, agentId } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        assignedAgent: agentId,
        status: "in-progress",
        updatedAt: Date.now(),
      },
      { new: true }
    );

    // Create assigned complaint record
    const assignedComplaint = new AssignedComplaint({
      agentId,
      complaintId,
      agentName: req.body.agentName,
      status: "assigned",
    });

    await assignedComplaint.save();

    res.status(200).json({
      message: "Complaint assigned successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
