const express = require("express");
const messageController = require("../controllers/messageController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Send message
router.post("/send", authMiddleware, messageController.sendMessage);

// Get messages for a complaint
router.get(
  "/:complaintId",
  authMiddleware,
  messageController.getMessages
);

// Mark messages as read
router.put(
  "/:complaintId/read",
  authMiddleware,
  messageController.markMessagesAsRead
);

module.exports = router;
