const Stock = require("../../../models/inventaryManagers/Stock");
const mongoose = require("mongoose");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


// Create Stock
const createStock = async (req, res) => {
  try {
    const stock = await Stock.create(req.body);

    res.status(201).json({
      success: true,
      data: stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Stocks
const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find()
      .populate("productId");

    res.status(200).json({
      success: true,
      data: stocks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Stock
const updateStock = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid stock ID",
    });
  }

  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("productId");

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    res.status(200).json({
      success: true,
      data: stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Stock
const deleteStock = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid stock ID",
    });
  }

  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stock deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createStock,
  getStocks,
  updateStock,
  deleteStock,
};
