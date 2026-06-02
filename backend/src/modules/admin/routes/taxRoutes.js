const express = require("express");

const router = express.Router();

const {
  getTaxSettings,
  updateTaxSettings,
} = require("../controllers/taxController");

router.get("/", getTaxSettings);
router.put("/", updateTaxSettings);

module.exports = router;
