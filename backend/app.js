const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

module.exports = app;
