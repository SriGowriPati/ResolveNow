const express = require("express");
const adminController = require("../controllers/adminController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Get dashboard stats
router.get(
  "/dashboard/stats",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getDashboardStats
);

// Get all complaints
router.get(
  "/complaints",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAllComplaints
);

// Reassign complaint
router.put(
  "/complaints/reassign",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.reassignComplaint
);

// Delete user
router.delete(
  "/users/:userId",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.deleteUser
);

// Get agent stats
router.get(
  "/agents/stats",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAgentStats
);

module.exports = router;
