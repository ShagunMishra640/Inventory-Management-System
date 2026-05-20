const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./src/modules/admin/routes/authRoutes");
const orderRoutes = require("./src/modules/admin/routes/orderRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;
