const router = require("express").Router();

const {
  getDashboardData,
  getProfileActivities,
} = require("../controllers/inventoryDashboardController");

router.get("/reports", getDashboardData);
router.get("/profile-activities", getProfileActivities);

module.exports = router;
