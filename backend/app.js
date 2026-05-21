// app.js

const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./src/modules/auth/routes/authRoutes");
const orderRoutes = require("./src/modules/admin/routes/orderRoutes");

const app = express();

// Database Connection
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;
