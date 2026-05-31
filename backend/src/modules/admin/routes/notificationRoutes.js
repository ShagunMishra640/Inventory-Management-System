const express = require("express");

const router = express.Router();

const {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  markAsRead,
  markAllAsRead,
  getUnreadNotifications,
  getNotificationsByType,
  getNotificationStats,
  searchNotifications,
  deleteNotification,
  deleteAllNotifications,
} = require("../controllers/notificationController");


// GET all notifications
router.get("/", getNotifications);

router.get("/unread", getUnreadNotifications);

router.get("/low-stock", getNotificationsByType("warning"));

router.get("/orders", getNotificationsByType("order"));

router.get("/employees", getNotificationsByType("employee"));

router.get("/system", getNotificationsByType("system"));

router.get("/stats", getNotificationStats);

router.get("/search/:keyword", searchNotifications);

// CREATE notification
router.post("/", createNotification);

router.patch("/mark-all-read", markAllAsRead);

router.delete("/delete-all", deleteAllNotifications);

router.get("/:id", getNotificationById);

router.put("/:id", updateNotification);

router.patch("/:id/read", markAsRead);

// DELETE notification
router.delete("/:id", deleteNotification);

module.exports = router;
