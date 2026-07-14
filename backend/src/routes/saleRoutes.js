const express = require("express");
const router = express.Router();
const {
  createSale,
  getSales,
  getSale,
  getCustomerHistory,
  getStats,
} = require("../controllers/saleController");

const {
  protect,
  adminOnly,
  pharmacistOnly,
} = require("../middleware/authMiddleware");



// Pharmacist makes sales
router.post("/", protect, pharmacistOnly, createSale);


// Both admin and pharmacist can view sales
router.get("/", protect, getSales);
router.get("/stats", protect, getStats);
router.get("/customer/:phone", protect, getCustomerHistory);
router.get("/:id", protect, getSale);


module.exports = router;