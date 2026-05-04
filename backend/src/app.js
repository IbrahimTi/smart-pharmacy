const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(function(req, res, next){
  console.log("REQUEST HIT:", req.method, req.url);
  next();
});

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const medicineRoutes = require("./routes/medicineRoutes");
app.use("/api/medicines", medicineRoutes);

const saleRoutes = require("./routes/saleRoutes");
app.use("/api/sales", saleRoutes);

const prescriptionRoutes = require("./routes/prescriptionRoutes");
app.use("/api/prescriptions", prescriptionRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Pharmacy Server is running!",
  });
});

module.exports = app;