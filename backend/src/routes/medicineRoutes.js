const express = require("express");
const router = express.Router();
const {
  getMedicines,
  getMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getLowStock,
  getExpiring,
} = require("../controllers/medicineController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// Both can view medicines
router.get("/", protect, getMedicines);
router.get("/low-stock", protect, getLowStock);
router.get("/expiring", protect, getExpiring);
router.get("/:id", protect, getMedicine);

// Only admin can add, update, delete
router.post("/", protect, adminOnly, addMedicine);
router.put("/:id", protect, adminOnly, updateMedicine);
router.delete("/:id", protect, adminOnly, deleteMedicine);

module.exports = router;