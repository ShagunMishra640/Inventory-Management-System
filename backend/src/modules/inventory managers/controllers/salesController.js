const Order = require("../../../models/cashier/Order");

const formatSale = (order) => {
  const firstProduct = order.products?.[0]?.productId;
  const productCount = order.products?.length || 0;
  const productName =
    firstProduct?.name ||
    (productCount > 1 ? `${productCount} products` : "Unknown Product");

  return {
    id: order.orderNumber || `#${String(order._id).slice(-6).toUpperCase()}`,
    customer: order.customer?.name || "Walk-in Customer",
    product: productName,
    amount: Number(order.totalAmount || 0),
    date: order.createdAt,
    status: order.orderStatus || order.paymentStatus || "PLACED",
    raw: order,
  };
};

const getSales = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("customer")
      .populate("cashier")
      .populate("products.productId");

    res.status(200).json(orders.map(formatSale));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSalesStats = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("customer")
      .populate("cashier")
      .populate("products.productId");

    const allOrders = await Order.find();
    const totalRevenue = allOrders.reduce(
      (total, order) => total + Number(order.totalAmount || 0),
      0,
    );

    res.status(200).json({
      totalRevenue,
      totalOrders: allOrders.length,
      growthRate: 0,
      netProfit: totalRevenue,
      sales: orders.map(formatSale),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSales,
  getSalesStats,
};
