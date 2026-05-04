const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

console.log("authController:", authController);
console.log("register function:", authController.register);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", protect, authController.getMe);

module.exports = router;