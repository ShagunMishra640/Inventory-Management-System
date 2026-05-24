const { body } = require("express-validator");

// ================= CREATE PRODUCT VALIDATION =================

exports.createProductValidation = [
  body("name").notEmpty().withMessage("Product name required"),

  body("price").notEmpty().withMessage("Price required"),

  body("stock").notEmpty().withMessage("Stock required"),

  body("category").notEmpty().withMessage("Category required"),
];
