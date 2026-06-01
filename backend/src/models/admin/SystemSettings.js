const mongoose = require("mongoose");

const systemSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "My Inventory Store",
    },

    companyEmail: {
      type: String,
      default: "admin@gmail.com",
    },

    mobileNumber: {
      type: String,
      default: "+91 9876543210",
    },

    role: {
      type: String,
      default: "Inventory Admin",
    },

    lowStockAlerts: {
      type: Boolean,
      default: true,
    },

    autoReports: {
      type: Boolean,
      default: true,
    },

    cloudBackup: {
      type: Boolean,
      default: false,
    },

    darkMode: {
      type: Boolean,
      default: true,
    },

    twoFactorAuth: {
      type: Boolean,
      default: true,
    },

    lowStockLimit: {
      type: Number,
      default: 10,
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

    currency: {
      type: String,
      default: "INR",
    },

    language: {
      type: String,
      default: "English",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SystemSettings", systemSettingsSchema);
