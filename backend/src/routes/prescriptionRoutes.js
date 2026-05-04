const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  uploadPrescription,
  getPrescriptions,
  getPrescription,
  updateStatus,
  checkDuplicate,
} = require("../controllers/prescriptionController");

const {
  protect,
  adminOnly,
  pharmacistOnly,
} = require("../middleware/authMiddleware");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "prescription-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Routes
router.post("/upload", protect, upload.single("prescription"), uploadPrescription);
router.get("/", protect, getPrescriptions);
router.get("/check/:id", protect, checkDuplicate);
router.get("/:id", protect, getPrescription);
router.put("/:id/status", protect, adminOnly, updateStatus);

module.exports = router;