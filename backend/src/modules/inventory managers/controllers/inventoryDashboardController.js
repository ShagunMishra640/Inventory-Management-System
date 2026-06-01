const Product = require("../../../models/inventaryManagers/Product");
const Category = require("../../../models/inventaryManagers/Category");
const Supplier = require("../../../models/inventaryManagers/Supplier");
const Stock = require("../../../models/inventaryManagers/Stock");
const PurchaseOrder = require("../../../models/inventaryManagers/PurchaseOrder");
const Customer = require("../../../models/cashier/Customer");


// Dashboard Summary
const getDashboardData = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalCategories = await Category.countDocuments();

    const totalSuppliers = await Supplier.countDocuments();

    const totalStocks = await Stock.countDocuments();
    const totalPurchaseOrders = await PurchaseOrder.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const recentPurchaseOrders = await PurchaseOrder.find()
      .populate("supplier")
      .populate("items.product")
      .sort({ createdAt: -1 })
      .limit(5);
    const lowStockProducts = await Product.find({
      $expr: {
        $lte: ["$stock", "$minStock"],
      },
    }).limit(5);
    const totalRevenueResult = await PurchaseOrder.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalCategories,
        totalSuppliers,
        totalStocks,
        totalPurchaseOrders,
        totalCustomers,
        totalRevenue,
        lowStockCount: lowStockProducts.length,
        lowStockProducts,
        recentPurchaseOrders,
        recentActivity: [
          totalPurchaseOrders ? "Purchase order updated" : "No purchase orders yet",
          totalProducts ? "Product inventory synced" : "No products yet",
          totalSuppliers ? "Supplier records loaded" : "No suppliers yet",
          lowStockProducts.length ? "Low stock products detected" : "Stock levels healthy",
        ],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};
