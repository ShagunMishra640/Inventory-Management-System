const express = require("express");

const router = express.Router();

const {
  createPurchaseOrder,
  getPurchaseOrders,
  updatePurchaseOrder,
  deletePurchaseOrder,
} = require("../controllers/purchaseOrderController");

router.post("/", createPurchaseOrder);
router.get("/", getPurchaseOrders);
router.put("/:id", updatePurchaseOrder);
router.delete("/:id", deletePurchaseOrder);

module.exports = router;
