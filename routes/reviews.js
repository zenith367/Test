const express = require("express");
const router = express.Router();
const { verifyToken } = require("../services/verifyToken");
const {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewsController");

// CRUD routes
router.post("/", verifyToken, addReview);
router.get("/", getReviews);
router.put("/:id", verifyToken, updateReview);
router.delete("/:id", verifyToken, deleteReview);

module.exports = router;
