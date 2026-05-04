const Medicine = require("../models/Medicine");

// ─────────────────────────────────────
// GET ALL MEDICINES
// GET /api/medicines
// Anyone logged in can view medicines
// ─────────────────────────────────────
const getMedicines = async (req, res) => {
  try {
    // Get search and filter from URL
    // Example: /api/medicines?search=para&category=Painkiller
    const { search, category } = req.query;

    // Build filter object
    let filter = { isActive: true };

    // If search query exists, search by name
    if (search) {
      filter.name = { $regex: search, $options: "i" };
      // $regex means "contains this text"
      // $options: "i" means case-insensitive
    }

    // If category filter exists
    if (category) {
      filter.category = category;
    }

    // Get medicines from database
    const medicines = await Medicine.find(filter).sort({ createdAt: -1 });
    // .sort({ createdAt: -1 }) means newest first

    res.status(200).json({
      success: true,
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// GET SINGLE MEDICINE
// GET /api/medicines/:id
// ─────────────────────────────────────
const getMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// ADD MEDICINE
// POST /api/medicines
// Admin only
// ─────────────────────────────────────
const addMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);

    res.status(201).json({
      success: true,
      message: "Medicine added successfully",
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// UPDATE MEDICINE
// PUT /api/medicines/:id
// Admin only
// ─────────────────────────────────────
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // return updated medicine
        runValidators: true, // check validation rules
      }
    );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// DELETE MEDICINE
// DELETE /api/medicines/:id
// Admin only
// ─────────────────────────────────────
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { isActive: false }, // we dont actually delete
      { new: true }        // we just mark as inactive
    );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// GET LOW STOCK MEDICINES
// GET /api/medicines/low-stock
// ─────────────────────────────────────
const getLowStock = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      $expr: { $lte: ["$stock", "$lowStockThreshold"] },
      isActive: true,
    });

    res.status(200).json({
      success: true,
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// GET EXPIRING MEDICINES
// GET /api/medicines/expiring
// ─────────────────────────────────────
const getExpiring = async (req, res) => {
  try {
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    // Get medicines already expired OR expiring in 30 days
    const medicines = await Medicine.find({
      expiryDate: { $lte: next30Days },
      isActive: true,
    });

    res.status(200).json({
      success: true,
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMedicines,
  getMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getLowStock,
  getExpiring,
};