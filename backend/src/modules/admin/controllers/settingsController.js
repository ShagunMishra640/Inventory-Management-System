// controllers/settingsController.js

const {
  getSettingsService,
  updateSettingsService,
} = require("../services/settingsService");

const withAliases = (settings) => {
  const data = settings.toObject ? settings.toObject() : { ...settings };

  return {
    ...data,
    storeName: data.storeName || data.companyName,
    email: data.email || data.companyEmail,
    phone: data.phone || data.mobileNumber,
    autoBackup: data.autoBackup ?? data.cloudBackup,
  };
};

const normalizeSettingsPayload = (body) => ({
  ...body,
  companyName: body.companyName ?? body.storeName,
  companyEmail: body.companyEmail ?? body.email,
  mobileNumber: body.mobileNumber ?? body.phone,
  cloudBackup: body.cloudBackup ?? body.autoBackup,
});


// ================= GET SETTINGS =================

const getSettings = async (req, res) => {
  try {
    const settings = await getSettingsService();

    res.status(200).json({
      success: true,
      settings: withAliases(settings),
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

    const settings = await updateSettingsService(normalizeSettingsPayload(req.body));

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings: withAliases(settings),
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
