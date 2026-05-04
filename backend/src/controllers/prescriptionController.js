const Prescription = require("../models/Prescription");
const Customer = require("../models/Customer");
const path = require("path");
const fs = require("fs");

// ─────────────────────────────────────
// UPLOAD PRESCRIPTION
// POST /api/prescriptions/upload
// ─────────────────────────────────────
const uploadPrescription = async (req, res) => {
  try {
    const { customerPhone, customerName, doctorName, hospitalName, notes } = req.body;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a prescription file",
      });
    }

    // Find or create customer
    let customer = await Customer.findOne({ phone: customerPhone });
    if (!customer) {
      customer = await Customer.create({
        name: customerName,
        phone: customerPhone,
      });
    }

    // Create prescription record
    const prescription = await Prescription.create({
      uploadedBy: req.user.id,
      customer: customer._id,
      doctorName,
      hospitalName,
      fileUrl: req.file.path,
      fileName: req.file.filename,
      notes,
    });

    const fullPrescription = await Prescription.findById(prescription._id)
      .populate("customer", "name phone")
      .populate("uploadedBy", "name");

    res.status(201).json({
      success: true,
      message: "Prescription uploaded successfully",
      prescription: fullPrescription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// GET ALL PRESCRIPTIONS
// GET /api/prescriptions
// ─────────────────────────────────────
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("customer", "name phone")
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// GET SINGLE PRESCRIPTION
// GET /api/prescriptions/:id
// ─────────────────────────────────────
const getPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("customer", "name phone")
      .populate("uploadedBy", "name");

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    res.status(200).json({
      success: true,
      prescription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// APPROVE OR REJECT PRESCRIPTION
// PUT /api/prescriptions/:id/status
// Admin only
// ─────────────────────────────────────
const updateStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Prescription ${status}`,
      prescription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// CHECK DUPLICATE PRESCRIPTION
// GET /api/prescriptions/check/:id
// Fraud Detection
// ─────────────────────────────────────
const checkDuplicate = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    if (prescription.isUsed) {
      return res.status(400).json({
        success: false,
        message: "FRAUD ALERT: This prescription has already been used!",
        usedInSale: prescription.usedInSale,
      });
    }

    res.status(200).json({
      success: true,
      message: "Prescription is valid and not used before",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadPrescription,
  getPrescriptions,
  getPrescription,
  updateStatus,
  checkDuplicate,
};