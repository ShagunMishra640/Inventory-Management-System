const express = require("express");

const router = express.Router();

const {
  createStock,
  getStocks,
  updateStock,
  deleteStock,
} = require("../controllers/stockController");

router.post("/", createStock);
router.get("/", getStocks);
router.put("/:id", updateStock);
router.delete("/:id", deleteStock);

module.exports = router;
