const express = require("express");

const router = express.Router();

const {
  getDashboardData,
} = require("../../controllers/cashier/dashboardController");

router.get("/", getDashboardData);

module.exports = router;
