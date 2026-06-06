const express = require("express");

const router = express.Router();

// ================= CONTROLLERS =================

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

// ================= MIDDLEWARES =================

const protect = require("../../../middlewares/authMiddleware");

const authorizeRoles = require("../../../middlewares/roleMiddleware");

const orderRoles = ["cashier", "admin", "inventory-manager", "manager"];

// ================= CREATE ORDER =================

router.post(
  "/create",

  protect,

  authorizeRoles(...orderRoles),

  createOrder,
);

router.post(
  "/",

  protect,

  authorizeRoles(...orderRoles),

  createOrder,
);

// ================= GET ORDERS =================

router.get(
  "/",

  protect,

  authorizeRoles(...orderRoles),

  getOrders,
);

router.get(
  "/:id",

  protect,

  authorizeRoles(...orderRoles),

  getOrderById,
);

// ================= UPDATE ORDER =================

router.put(
  "/update/:id",

  protect,

  authorizeRoles(...orderRoles),

  updateOrder,
);

router.put(
  "/:id",

  protect,

  authorizeRoles(...orderRoles),

  updateOrder,
);

// ================= DELETE ORDER =================

router.delete(
  "/delete/:id",

  protect,

  authorizeRoles(...orderRoles),

  deleteOrder,
);

router.delete(
  "/:id",

  protect,

  authorizeRoles(...orderRoles),

  deleteOrder,
);

module.exports = router;
