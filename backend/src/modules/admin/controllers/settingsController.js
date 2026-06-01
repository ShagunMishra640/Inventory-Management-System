// controllers/settingsController.js

// Dummy settings data
let settings = {
  storeName: "RetailPOS System",
  companyName: "RetailPOS System",
  email: "admin@retailpos.com",
  companyEmail: "admin@retailpos.com",
  phone: "+1 (555) 123-4567",
  currency: "INR",
  timezone: "Asia/Kolkata",
  lowStockLimit: 10,
  emailNotifications: true,
  smsNotifications: false,
  darkMode: false,
  autoBackup: true,
  backupFrequency: "daily",
  sessionTimeout: "30",
};


// ================= GET SETTINGS =================

const getSettings = async (req, res) => {
  try {

    res.status(200).json({
      success: true,
      settings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ================= UPDATE SETTINGS =================

const updateSettings = async (req, res) => {
  try {

    settings = {
      ...settings,
      ...req.body,
    };

    if (req.body.storeName) settings.companyName = req.body.storeName;
    if (req.body.companyName) settings.storeName = req.body.companyName;
    if (req.body.email) settings.companyEmail = req.body.email;
    if (req.body.companyEmail) settings.email = req.body.companyEmail;

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getSettings,
  updateSettings,
};
