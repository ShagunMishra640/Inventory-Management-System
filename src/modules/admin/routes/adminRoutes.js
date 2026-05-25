const express = require("express");

const router = express.Router();

// ================= CONTROLLERS =================

const {
  registerAdmin,
  loginAdmin,
  getDashboard,
  getAllAdmins,
} = require("../controllers/adminController");

// ================= MIDDLEWARES =================

const protect = require("../../../middlewares/authMiddleware");

const authorizeRoles = require("../../../middlewares/roleMiddleware");

// ================= ADMIN AUTH =================

router.post("/register", registerAdmin);


// ================= REGISTER ADMIN =================

router.post("/register", registerAdmin);

// ================= LOGIN ADMIN =================


router.post("/login", loginAdmin);

// ================= ADMIN DASHBOARD =================

router.get("/dashboard", protect, authorizeRoles("admin"), getDashboard);

// ================= GET ALL ADMINS =================

router.get("/admins", protect, authorizeRoles("admin"), getAllAdmins);

module.exports = router;