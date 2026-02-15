const express = require("express");
const { body } = require("express-validator");
const complaintController = require("../controllers/complaintController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Create complaint (customer only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("pincode").notEmpty().withMessage("Pincode is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  complaintController.createComplaint
);

// Get user complaints
router.get(
  "/my-complaints",
  authMiddleware,
  roleMiddleware("customer"),
  complaintController.getUserComplaints
);

// Get complaint by ID
router.get(
  "/:id",
  authMiddleware,
  complaintController.getComplaintById
);

// Update complaint (customer - can update status/feedback)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("customer"),
  complaintController.updateComplaint
);

// Get all complaints (admin/agent)
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "agent"),
  complaintController.getAllComplaints
);

// Assign complaint (admin only)
router.post(
  "/assign",
  authMiddleware,
  roleMiddleware("admin"),
  complaintController.assignComplaint
);

module.exports = router;
