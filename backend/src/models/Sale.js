const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    // Invoice number (unique for each sale)
    invoiceNumber: {
      type: String,
      unique: true,
    },

    // Who served the customer
    pharmacist: {
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

    // List of medicines sold
    items: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
          required: true,
        },
        medicineName: String,  // save name in case medicine deleted later
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],

    // Payment details
    totalAmount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Mobile Banking"],
      default: "Cash",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Paid",
    },

    // Prescription reference
    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
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

// Auto generate invoice number before saving
saleSchema.pre("save", async function () {
  if (!this.invoiceNumber) {
    const count = await mongoose.model("Sale").countDocuments();
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    this.invoiceNumber = `INV-${year}${month}-${String(count + 1).padStart(4, "0")}`;
    // Example: INV-202604-0001
  }
});

module.exports = mongoose.model("Sale", saleSchema);