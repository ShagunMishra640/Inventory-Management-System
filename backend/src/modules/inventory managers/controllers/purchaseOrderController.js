const PurchaseOrder = require("../../../models/inventaryManagers/PurchaseOrder");
const mongoose = require("mongoose");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


// Create Purchase Order
const createPurchaseOrder = async (req, res) => {
  try {
    const order = await PurchaseOrder.create(req.body);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Purchase Orders
const getPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find()
      .populate("supplier")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Purchase Order
const updatePurchaseOrder = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid purchase order ID",
    });
  }

  try {
    const order = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("supplier")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Purchase order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Purchase Order
const deletePurchaseOrder = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid purchase order ID",
    });
  }

  try {
    const order = await PurchaseOrder.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Purchase order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Purchase order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPurchaseOrder,
  getPurchaseOrders,
  updatePurchaseOrder,
  deletePurchaseOrder,
};
