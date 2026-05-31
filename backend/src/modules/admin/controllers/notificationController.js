const mongoose = require("mongoose");
const Notification = require("../../../models/admin/Notification");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const buildNotificationQuery = (type) => {
  if (!type) {
    return {};
  }

  if (type === "warning") {
    return { type: { $in: ["warning", "low-stock"] } };
  }

  return { type };
};

const sendNotifications = async (res, query = {}) => {
  const notifications = await Notification.find(query).sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    total: notifications.length,
    notifications,
    data: notifications,
  });
};

const getNotifications = async (req, res) => {
  try {
    return sendNotifications(res);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getNotificationById = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid notification ID" });
  }

  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    return res.status(200).json({
      success: true,
      notification,
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createNotification = async (req, res) => {
  try {
    const { title, message, type, receiver, userId } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ success: false, message: "Notification message required" });
    }

    const notification = await Notification.create({
      title: title?.trim() || message.trim(),
      message: message.trim(),
      type: type || "info",
      receiver: receiver || undefined,
      userId: userId || receiver || undefined,
      isRead: false,
    });

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification,
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateNotification = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid notification ID" });
  }

  try {
    const allowedFields = ["title", "message", "type", "receiver", "userId", "isRead"];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Notification updated successfully",
      notification,
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const markAsRead = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid notification ID" });
  }

  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true },
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { isRead: false },
      { isRead: true },
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUnreadNotifications = async (req, res) => {
  try {
    return sendNotifications(res, { isRead: false });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getNotificationsByType = (type) => async (req, res) => {
  try {
    return sendNotifications(res, buildNotificationQuery(type));
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getNotificationStats = async (req, res) => {
  try {
    const [total, unread, alerts, orders, employees, system] = await Promise.all([
      Notification.countDocuments(),
      Notification.countDocuments({ isRead: false }),
      Notification.countDocuments(buildNotificationQuery("warning")),
      Notification.countDocuments(buildNotificationQuery("order")),
      Notification.countDocuments(buildNotificationQuery("employee")),
      Notification.countDocuments(buildNotificationQuery("system")),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        total,
        unread,
        alerts,
        orders,
        employees,
        system,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const searchNotifications = async (req, res) => {
  try {
    const keyword = req.params.keyword || "";
    const regex = new RegExp(keyword, "i");

    return sendNotifications(res, {
      $or: [{ title: regex }, { message: regex }, { type: regex }],
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteNotification = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid notification ID" });
  }

  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAllNotifications = async (req, res) => {
  try {
    const result = await Notification.deleteMany({});

    return res.status(200).json({
      success: true,
      message: "All notifications deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
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
};
