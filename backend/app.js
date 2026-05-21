const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./src/modules/auth/routes/authRoutes");
const orderRoutes = require("./src/modules/admin/routes/orderRoutes");
const productRoutes = require("./src/modules/inventory managers/routes/productRoutes");
const categoryRoutes = require("./src/modules/inventory managers/routes/categoryRoutes");
const warehouseRoutes = require("./src/modules/inventory managers/routes/warehouseRoutes");
const supplierRoutes = require("./src/modules/inventory managers/routes/supplierRoutes");
const stockRoutes = require("./src/modules/inventory managers/routes/stockRoutes");
const { createProduct } = require("./src/modules/inventory managers/controllers/productController");
const validationHandler = require("./src/modules/inventory managers/middleware/validationHandler");
const {
  createProductValidation,
} = require("./src/modules/inventory managers/validations/productValidation");
const purchaseOrderRoutes = require("./src/modules/inventory managers/routes/purchaseOrderRoutes");
const errorMiddleware = require("./src/modules/inventory managers/middleware/errorMiddleware");

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/api/createProduct", createProductValidation, validationHandler, createProduct);
app.post("/api/products/create", createProductValidation, validationHandler, createProduct);
app.post("/api/products/createProduct", createProductValidation, validationHandler, createProduct);
app.use("/api/products/stock", stockRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);

app.use(errorMiddleware);


module.exports = app;
