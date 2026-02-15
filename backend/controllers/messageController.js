const Message = require("../models/Message");
const User = require("../models/User");
const Complaint = require("../models/Complaint");

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { complaintId, message, senderType } = req.body;

    const sender = await User.findById(req.user.userId);

    const newMessage = new Message({
      userId: req.user.userId,
      senderType,
      complaintId,
      senderName: sender.fullName,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages for a complaint
exports.getMessages = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const messages = await Message.find({ complaintId }).populate(
      "userId",
      "fullName profileImage"
    );

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark messages as read
exports.markMessagesAsRead = async (req, res) => {
  try {
    const { complaintId } = req.params;

    await Message.updateMany(
      { complaintId, userId: { $ne: req.user.userId } },
      { isRead: true }
    );

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
