import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  deleteAllNotifications,
  getNotifications,
} from "../services/notificationService";

import {
  FaBell,
  FaSearch,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaShoppingCart,
  FaUserPlus,
  FaBoxOpen,
  FaTrash,
} from "react-icons/fa";

const getRelativeTime = (dateValue) => {
  if (!dateValue) {
    return "Just now";
  }

  const diffMs = Date.now() - new Date(dateValue).getTime();
  const diffMinutes = Math.max(1, Math.floor(diffMs / 60000));

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getNotifications();
      setNotifications(
        Array.isArray(response.notifications)
          ? response.notifications
          : Array.isArray(response.data)
          ? response.data
          : [],
      );
    } catch (err) {
      setError(err.response?.data?.message || "Notifications load failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const filteredNotifications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return notifications;
    }

    return notifications.filter((notification) =>
      [notification.title, notification.message, notification.type].some(
        (value) => String(value || "").toLowerCase().includes(query),
      ),
    );
  }, [notifications, searchTerm]);

  const stats = useMemo(
    () => ({
      total: notifications.length,
      success: notifications.filter((item) => item.type === "success").length,
      alerts: notifications.filter((item) =>
        ["warning", "low-stock"].includes(item.type),
      ).length,
      info: notifications.filter((item) =>
        ["info", "system"].includes(item.type || "info"),
      ).length,
    }),
    [notifications],
  );

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to clear all notifications?")) {
      return;
    }

    try {
      setError("");
      await deleteAllNotifications();
      setNotifications([]);
    } catch (err) {
      setError(err.response?.data?.message || "Notifications clear failed");
    }
  };

  const getIcon = (type) => {
    switch (type) {

      case "order":
        return (
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-3xl">
            <FaShoppingCart />
          </div>
        );

      case "warning":
        return (
          <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-3xl">
            <FaExclamationTriangle />
          </div>
        );

      case "employee":
        return (
          <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-3xl">
            <FaUserPlus />
          </div>
        );

      case "inventory":
        return (
          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-3xl">
            <FaBoxOpen />
          </div>
        );

      default:
        return (
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl">
            <FaCheckCircle />
          </div>
        );
    }
  };

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="ml-[280px] w-full">

        {/* TOPBAR */}

        <div className="bg-white px-10 py-6 flex justify-between items-center border-b">

          {/* SEARCH */}

          <div className="relative w-[420px]">

            <FaSearch className="absolute top-5 left-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
            />
          </div>

          {/* PROFILE */}

          <div className="flex items-center gap-8">

            <div className="relative">

              <FaBell className="text-3xl text-blue-600" />

              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">
                5
              </div>
            </div>

            <div className="flex items-center gap-4">

              <img
                src="/Rutika.jpg.jpeg"
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>

                <h3 className="font-bold text-xl">
                  Rutika Pujari
                </h3>

                <p className="text-gray-500">
                  Notification Manager
                </p>

              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-10">

          {/* HEADER */}

          <div className="flex justify-between items-center mb-10">

            <div>

              <h1 className="text-6xl font-bold text-[#061539]">
                Notifications
              </h1>

              <p className="text-gray-500 text-xl mt-3">
                Stay updated with all business activities and alerts.
              </p>

            </div>

            <button
              type="button"
              onClick={handleClearAll}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 transition-all duration-300 text-white px-8 py-5 rounded-2xl flex items-center gap-4 text-xl font-semibold shadow-xl"
            >

              <FaTrash />

              Clear All
            </button>
          </div>

          {/* STATS */}

          <div className="grid grid-cols-4 gap-8 mb-10">

            {/* TOTAL */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Total Notifications
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {stats.total}
                  </h1>

                </div>

                <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-4xl">

                  <FaBell />

                </div>
              </div>
            </div>

            {/* SUCCESS */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Successful
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {stats.success}
                  </h1>

                </div>

                <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-4xl">

                  <FaCheckCircle />

                </div>
              </div>
            </div>

            {/* ALERTS */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Alerts
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {stats.alerts}
                  </h1>

                </div>

                <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-4xl">

                  <FaExclamationTriangle />

                </div>
              </div>
            </div>

            {/* INFO */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Information
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {stats.info}
                  </h1>

                </div>

                <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-4xl">

                  <FaInfoCircle />

                </div>
              </div>
            </div>
          </div>

          {/* NOTIFICATION LIST */}

          <div className="space-y-6">

            {error && (
              <div className="bg-red-100 text-red-700 px-6 py-4 rounded-2xl font-semibold">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="bg-white rounded-3xl p-8 text-center text-gray-500">
                Notifications loading...
              </div>
            )}

            {!isLoading && filteredNotifications.map((notification) => (
              <div
                key={notification._id || notification.id}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex items-start justify-between"
              >

                <div className="flex items-start gap-6">

                  {/* ICON */}

                  {getIcon(notification.type)}

                  {/* TEXT */}

                  <div>

                    <h2 className="text-3xl font-bold text-[#061539]">
                      {notification.title}
                    </h2>

                    <p className="text-gray-500 text-lg mt-3 leading-relaxed">
                      {notification.message}
                    </p>

                    <div className="mt-5 flex items-center gap-4">

                      <span className="bg-[#f5f7fb] px-5 py-2 rounded-xl text-gray-600 font-medium">
                        {getRelativeTime(notification.createdAt)}
                      </span>

                      <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>

                {/* DOT */}

                <div className="w-4 h-4 rounded-full bg-blue-600 mt-3" />
              </div>
            ))}

            {!isLoading && filteredNotifications.length === 0 && (
              <div className="bg-white rounded-3xl p-8 text-center text-gray-500">
                Notification data is not available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
