import API from "../../api/axios";

/* ===========================
   GET ALL NOTIFICATIONS
=========================== */
export const getNotifications = async () => {
  const response = await API.get("/notifications");
  return response.data;
};

/* ===========================
   GET SINGLE NOTIFICATION
=========================== */
export const getNotificationById = async (id) => {
  const response = await API.get(`/notifications/${id}`);
  return response.data;
};

/* ===========================
   CREATE NOTIFICATION
=========================== */
export const createNotification = async (
  notificationData
) => {
  const response = await API.post(
    "/notifications",
    notificationData
  );

  return response.data;
};

/* ===========================
   UPDATE NOTIFICATION
=========================== */
export const updateNotification = async (
  id,
  notificationData
) => {
  const response = await API.put(
    `/notifications/${id}`,
    notificationData
  );

  return response.data;
};

/* ===========================
   DELETE NOTIFICATION
=========================== */
export const deleteNotification = async (id) => {
  const response = await API.delete(`/notifications/${id}`);

  return response.data;
};

/* ===========================
   MARK AS READ
=========================== */
export const markAsRead = async (id) => {
  const response = await API.patch(`/notifications/${id}/read`);

  return response.data;
};

/* ===========================
   MARK ALL AS READ
=========================== */
export const markAllAsRead = async () => {
  const response = await API.patch("/notifications/mark-all-read");

  return response.data;
};

/* ===========================
   UNREAD NOTIFICATIONS
=========================== */
export const getUnreadNotifications =
  async () => {
    const response = await API.get("/notifications/unread");

    return response.data;
  };

/* ===========================
   LOW STOCK ALERTS
=========================== */
export const getLowStockAlerts =
  async () => {
    const response = await API.get("/notifications/low-stock");

    return response.data;
  };

/* ===========================
   ORDER NOTIFICATIONS
=========================== */
export const getOrderNotifications =
  async () => {
    const response = await API.get("/notifications/orders");

    return response.data;
  };

/* ===========================
   EMPLOYEE NOTIFICATIONS
=========================== */
export const getEmployeeNotifications =
  async () => {
    const response = await API.get("/notifications/employees");

    return response.data;
  };

/* ===========================
   SYSTEM NOTIFICATIONS
=========================== */
export const getSystemNotifications =
  async () => {
    const response = await API.get("/notifications/system");

    return response.data;
  };

/* ===========================
   NOTIFICATION STATS
=========================== */
export const getNotificationStats =
  async () => {
    const response = await API.get("/notifications/stats");

    return response.data;
  };

/* ===========================
   SEARCH NOTIFICATIONS
=========================== */
export const searchNotifications =
  async (keyword) => {
    const response = await API.get(
      `/notifications/search/${encodeURIComponent(keyword)}`
    );

    return response.data;
  };

/* ===========================
   DELETE ALL NOTIFICATIONS
=========================== */
export const deleteAllNotifications =
  async () => {
    const response = await API.delete("/notifications/delete-all");

    return response.data;
  };
