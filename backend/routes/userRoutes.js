const express = require("express");
const userController = require("../controllers/userController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Get user profile
router.get("/profile", authMiddleware, userController.getUserProfile);

// Update user profile
router.put("/profile", authMiddleware, userController.updateUserProfile);

// Get all users (admin only)
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  userController.getAllUsers
);

// Get users by type (admin only)
router.get(
  "/type/:userType",
  authMiddleware,
  roleMiddleware("admin"),
  userController.getUsersByType
);

module.exports = router;
