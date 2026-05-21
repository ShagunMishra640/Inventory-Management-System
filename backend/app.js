// app.js

const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// Database Connection
connectDB();

/* =========================
   LOAD MODELS
========================= */
require("./src/models/cashier/Cart");
require("./src/models/cashier/Customer");
require("./src/models/cashier/Discount");
require("./src/models/cashier/Invoice");
require("./src/models/cashier/Order");
require("./src/models/cashier/OrderItem");
require("./src/models/cashier/Payment");
require("./src/models/cashier/Receipt");
require("./src/models/cashier/Refund");
require("./src/models/cashier/Product");

// Middlewares
app.use(cors());
app.use(express.json());

/* =========================
   AUTH ROUTES
========================= */

// Register + Login Routes
const authRoutes = require("./src/modules/auth/routes/authRoutes");

// Logout Routes
const logoutRoutes = require("./src/modules/auth/routes/logoutRoutes");

// AUTH APIs
app.use("/api/auth", authRoutes);

app.use("/api/auth", logoutRoutes);

/* =========================
   CASHIER ROUTES
========================= */

const cartRoutes = require("./src/modules/cashier/routes/cartRoutes");

const cashierOrderRoutes = require("./src/modules/cashier/routes/orderRoutes");

const paymentRoutes = require("./src/modules/cashier/routes/paymentRoutes");

const receiptRoutes = require("./src/modules/cashier/routes/receiptRoutes");

const invoiceRoutes = require("./src/modules/cashier/routes/invoiceRoutes");

const refundRoutes = require("./src/modules/cashier/routes/refundRoutes");

const customerRoutes = require("./src/modules/cashier/routes/customerRoutes");

const discountRoutes = require("./src/modules/cashier/routes/discountRoutes");

// Cart APIs
app.use("/api/cart", cartRoutes);

// Order APIs
app.use("/api/order", cashierOrderRoutes);

// Payment APIs
app.use("/api/payment", paymentRoutes);

// Receipt APIs
app.use("/api/receipt", receiptRoutes);

// Invoice APIs
app.use("/api/invoice", invoiceRoutes);

// Refund APIs
app.use("/api/refund", refundRoutes);

// Customer APIs
app.use("/api/customer", customerRoutes);

// Discount APIs
app.use("/api/discount", discountRoutes);

/* =========================
   DEFAULT ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("Inventory Management API Running...");
});

module.exports = app;
