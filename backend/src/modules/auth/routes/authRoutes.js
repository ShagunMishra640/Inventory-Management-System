const express = require("express");

const router = express.Router();

// ================= CONTROLLERS =================

const {
  registerUser,
  loginUser,
  forgotPassword,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

// ================= VALIDATIONS =================

const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
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

router.post(
  "/forgot-password",
  forgotPasswordValidation,
  validationMiddleware,
  forgotPassword,
);

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

module.exports = router;
