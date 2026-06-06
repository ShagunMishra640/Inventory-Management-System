const express = require("express");

const router = express.Router();

const {
  getSales,
  getSalesStats,
} = require("../controllers/salesController");

const protect = require("../../../middlewares/authMiddleware");
const authorizeRoles = require("../../../middlewares/roleMiddleware");

const managerRoles = ["admin", "inventory-manager", "manager", "sales-manager"];

router.get("/", protect, authorizeRoles(...managerRoles), getSales);
router.get("/stats", protect, authorizeRoles(...managerRoles), getSalesStats);

module.exports = router;
