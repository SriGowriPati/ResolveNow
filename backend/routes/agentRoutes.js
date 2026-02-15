const express = require("express");
const agentController = require("../controllers/agentController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Get assigned complaints
router.get(
  "/assigned",
  authMiddleware,
  roleMiddleware("agent"),
  agentController.getAssignedComplaints
);

// Update complaint status
router.put(
  "/status",
  authMiddleware,
  roleMiddleware("agent"),
  agentController.updateComplaintStatus
);

// Get agent workload
router.get(
  "/workload",
  authMiddleware,
  roleMiddleware("agent"),
  agentController.getAgentWorkload
);

module.exports = router;
