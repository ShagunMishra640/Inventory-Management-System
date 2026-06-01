const express = require("express");

const router = express.Router();

// ================= CONTROLLERS =================

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

// ================= VALIDATIONS =================

const {
  registerValidation,
  loginValidation,
} = require("../../../validations/authValidation");

// ================= MIDDLEWARE =================

const validationMiddleware = require("../../../middlewares/validationMiddleware");
const protect = require("../../../middlewares/authMiddleware");

// ================= REGISTER ROUTE =================

router.post(
  "/register",

  registerValidation,

  validationMiddleware,

  registerUser,
);

// ================= LOGIN ROUTE =================

router.post(
  "/login",

  loginValidation,

  validationMiddleware,

  loginUser,
);

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

module.exports = router;
