const TaxSetting = require("../../../models/admin/TaxSetting");

const getTaxSettings = async (req, res) => {
  try {
    let taxSettings = await TaxSetting.findOne();

    if (!taxSettings) {
      taxSettings = await TaxSetting.create({});
    }

    res.status(200).json({
      success: true,
      taxSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTaxSettings = async (req, res) => {
  try {
    const taxSettings = await TaxSetting.findOneAndUpdate(
      {},
      {
        taxName: req.body.taxName,
        taxPercentage: req.body.taxPercentage,
        taxNumber: req.body.taxNumber,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Tax settings updated successfully",
      taxSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTaxSettings,
  updateTaxSettings,
};
