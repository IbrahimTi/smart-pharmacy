const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    // Who uploaded it
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Customer details
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    // Doctor details
    doctorName: {
      type: String,
      required: [true, "Doctor name is required"],
    },
    hospitalName: {
      type: String,
    },

    // Prescription file
    fileUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
    },

    // Medicines prescribed
    prescribedMedicines: [
      {
        medicineName: String,
        dosage: String,
        quantity: Number,
      },
    ],

    // Validation status
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // Fraud detection
    isUsed: {
      type: Boolean,
      default: false, // becomes true after sale is made
    },
    usedInSale: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale",
      default: null,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);