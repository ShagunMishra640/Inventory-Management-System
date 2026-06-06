const Product = require("../../../models/inventaryManagers/Product");
const Category = require("../../../models/inventaryManagers/Category");
const Supplier = require("../../../models/inventaryManagers/Supplier");
const Stock = require("../../../models/inventaryManagers/Stock");
const PurchaseOrder = require("../../../models/inventaryManagers/PurchaseOrder");
const Customer = require("../../../models/cashier/Customer");

const formatTimeAgo = (date) => {
  const activityDate = date ? new Date(date) : new Date();
  const seconds = Math.max(1, Math.floor((Date.now() - activityDate.getTime()) / 1000));
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  return "Just now";
};

const makeActivity = ({ title, description, module, iconType, color, date, status }) => ({
  id: `${module}-${new Date(date || Date.now()).getTime()}-${title.replace(/\s+/g, "-").toLowerCase()}`,
  title,
  description,
  module,
  iconType,
  color,
  status,
  createdAt: date || new Date(),
  time: formatTimeAgo(date),
});


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

const getProfileActivities = async (req, res) => {
  try {
    const [totalProducts, totalSuppliers, latestProduct, latestPurchaseOrder, lowStockProduct] =
      await Promise.all([
        Product.countDocuments(),
        Supplier.countDocuments(),
        Product.findOne().sort({ updatedAt: -1, createdAt: -1 }),
        PurchaseOrder.findOne()
          .populate("supplier")
          .sort({ updatedAt: -1, createdAt: -1 }),
        Product.findOne({
          $expr: {
            $lte: ["$stock", "$minStock"],
          },
        }).sort({ updatedAt: -1, createdAt: -1 }),
      ]);

    const activities = [
      makeActivity({
        title: "Reviewed Stock Levels",
        description: latestProduct
          ? `${latestProduct.name} stock checked. Current stock: ${latestProduct.stock}.`
          : `${totalProducts} stock items available for review.`,
        module: "Inventory",
        iconType: "boxes",
        color: "blue",
        date: latestProduct?.updatedAt || latestProduct?.createdAt || new Date(),
        status: "Completed",
      }),
      makeActivity({
        title: "Approved Purchase Order",
        description: latestPurchaseOrder
          ? `Purchase order ${latestPurchaseOrder.status} for ${
              latestPurchaseOrder.supplier?.name || "supplier"
            }. Total amount: ₹${latestPurchaseOrder.totalAmount || 0}.`
          : "No purchase order found yet. New purchase approvals will appear here.",
        module: "Purchase Orders",
        iconType: "clipboard",
        color: "green",
        date: latestPurchaseOrder?.updatedAt || latestPurchaseOrder?.createdAt || new Date(Date.now() - 5 * 60 * 60 * 1000),
        status: latestPurchaseOrder?.status || "Pending",
      }),
      makeActivity({
        title: "Generated Inventory Report",
        description: `Inventory report prepared with ${totalProducts} products and ${totalSuppliers} suppliers.`,
        module: "Reports",
        iconType: "chart",
        color: "purple",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: "Generated",
      }),
      makeActivity({
        title: "Checked Low Stock Alerts",
        description: lowStockProduct
          ? `${lowStockProduct.name} is low on stock (${lowStockProduct.stock}/${lowStockProduct.minStock}).`
          : "All tracked products are above their minimum stock limit.",
        module: "Low Stock",
        iconType: "check",
        color: "orange",
        date: lowStockProduct?.updatedAt || lowStockProduct?.createdAt || new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: lowStockProduct ? "Needs Attention" : "Healthy",
      }),
    ];

    res.status(200).json({
      success: true,
      data: activities,
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
  getProfileActivities,
};
