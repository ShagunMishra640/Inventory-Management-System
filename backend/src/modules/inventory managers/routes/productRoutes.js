const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const validationHandler = require("../middleware/validationHandler");
const {
  createProductValidation,
  updateProductValidation,
} = require("../validations/productValidation");
const authMiddleware = require("../../auth/middleware/authMiddleware");
const { managerOnly } = require("../middleware/roleMiddleware");
const auditMiddleware = require("../middleware/auditMiddleware");

// CREATE PRODUCT
router.post(
  "/",
  authMiddleware,
  managerOnly,
  auditMiddleware,
  createProductValidation,
  validationHandler,
  createProduct
);

router.post(
  "/create",
  authMiddleware,
  managerOnly,
  auditMiddleware,
  createProductValidation,
  validationHandler,
  createProduct
);


// GET ALL PRODUCTS
router.get("/", getProducts);

// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct);

// UPDATE PRODUCT
router.put(
  "/update/:id",
  authMiddleware,
  managerOnly,
  auditMiddleware,
  updateProductValidation,
  validationHandler,
  updateProduct
);

// DELETE PRODUCT
router.delete(
  "/delete/:id",
  authMiddleware,
  managerOnly,
  auditMiddleware,
  deleteProduct
);

module.exports = router;
