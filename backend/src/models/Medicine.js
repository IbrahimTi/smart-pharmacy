const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, "Medicine name is required"],
      trim: true,
    },
    genericName: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      // common pharmacy categories
      enum: [
        "Antibiotic",
        "Painkiller",
        "Antacid",
        "Vitamin",
        "Antidiabetic",
        "Antihypertensive",
        "Antihistamine",
        "Antiseptic",
        "Other",
      ],
    },
    manufacturer: {
      type: String,
      required: [true, "Manufacturer is required"],
    },

    // Pricing
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    // Stock Management
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: 0,
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 10, // alert when stock falls below 10
    },

    // Expiry Tracking
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    manufactureDate: {
      type: Date,
    },
location: {
  row: {
    type: String,
    trim: true,
    default: "",
  },
  column: {
    type: String,
    trim: true,
    default: "",
  },
},
    // Extra Details
    description: {
      type: String,
    },
    requiresPrescription: {
      type: Boolean,
      default: false, // some medicines need prescription
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);