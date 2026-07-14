const Sale = require("../models/Sale");
const Medicine = require("../models/Medicine");
const Customer = require("../models/Customer");

// ─────────────────────────────────────
// CREATE SALE
// POST /api/sales
// ─────────────────────────────────────
const createSale = async (req, res) => {
  try {
    const { customerName, customerPhone, items, discount, paymentMethod, notes } = req.body;

    // Step 1 — Find or create customer
    let customer = await Customer.findOne({ phone: customerPhone });
    if (!customer) {
      customer = await Customer.create({
        name: customerName,
        phone: customerPhone,
      });
    }

    // Step 2 — Check stock and calculate total
    let totalAmount = 0;
    const saleItems = [];

    for (const item of items) {
      // Find medicine in database
      const medicine = await Medicine.findById(item.medicineId);

      if (!medicine) {
        return res.status(404).json({
          success: false,
          message: `Medicine not found: ${item.medicineId}`,
        });
      }

      // Check if enough stock available
      if (medicine.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${medicine.name}. Available: ${medicine.stock}`,
        });
      }

      // Calculate subtotal for this item
      const subtotal = medicine.price * item.quantity;
      totalAmount += subtotal;

      saleItems.push({
        medicine: medicine._id,
        medicineName: medicine.name,
        quantity: item.quantity,
        price: medicine.price,
        subtotal,
      });
    }

    // Step 3 — Calculate final amount after discount
    const discountAmount = discount || 0;
    const finalAmount = totalAmount - discountAmount;

    // Step 4 — Create the sale
    const sale = await Sale.create({
      pharmacist: req.user.id,
      customer: customer._id,
      items: saleItems,
      totalAmount,
      discount: discountAmount,
      finalAmount,
      paymentMethod: paymentMethod || "Cash",
      notes,
    });

    // Step 5 — Deduct stock for each medicine
    for (const item of items) {
      await Medicine.findByIdAndUpdate(item.medicineId, {
        $inc: { stock: -item.quantity },
        // $inc means increment (negative = deduct)
      });
    }

    // Step 6 — Update customer purchase history
    await Customer.findByIdAndUpdate(customer._id, {
      $inc: {
        totalPurchases: 1,
        totalSpent: finalAmount,
      },
    });

    // Step 7 — Return sale with full details
    const fullSale = await Sale.findById(sale._id)
      .populate("customer")
      .populate("pharmacist", "name email")
      .populate("items.medicine", "name price");

    res.status(201).json({
      success: true,
      message: "Sale created successfully",
      sale: fullSale,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// GET ALL SALES
// GET /api/sales
// ─────────────────────────────────────
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("customer", "name phone")
      .populate("pharmacist", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sales.length,
      sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// GET SINGLE SALE (Invoice)
// GET /api/sales/:id
// ─────────────────────────────────────
const getSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate("customer")
      .populate("pharmacist", "name email")
      .populate("items.medicine", "name price category");

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }

    res.status(200).json({
      success: true,
      sale,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// GET CUSTOMER HISTORY
// GET /api/sales/customer/:phone
// ─────────────────────────────────────
const getCustomerHistory = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      phone: req.params.phone,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const sales = await Sale.find({ customer: customer._id })
      .populate("items.medicine", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      customer,
      totalSales: sales.length,
      sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────
// GET DASHBOARD STATS
// GET /api/sales/stats
// ─────────────────────────────────────
const getStats = async (req, res) => {
  try {
    // Today's date
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Start of month
    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    // Today's sales
    const todaySales = await Sale.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    // This month's sales
    const monthSales = await Sale.find({
      createdAt: { $gte: startOfMonth },
    });

    // Total customers
    const totalCustomers = await Customer.countDocuments();

    // Calculate totals
    const todayRevenue = todaySales.reduce(
      (sum, sale) => sum + sale.finalAmount, 0
    );
    const monthRevenue = monthSales.reduce(
      (sum, sale) => sum + sale.finalAmount, 0
    );

    res.status(200).json({
      success: true,
      stats: {
        today: {
          sales: todaySales.length,
          revenue: todayRevenue,
        },
        thisMonth: {
          sales: monthSales.length,
          revenue: monthRevenue,
        },
        totalCustomers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createSale,
  getSales,
  getSale,
  getCustomerHistory,
  getStats,
};