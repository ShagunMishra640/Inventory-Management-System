import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import { deleteOrder, getOrders, updateOrder } from "../services/orderService";

import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaBell,
  FaShoppingCart,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

const paymentLabels = {
  PAID: "Paid",
  PENDING: "Pending",
  FAILED: "Failed",
};

const statusLabels = {
  COMPLETED: "Delivered",
  PLACED: "Processing",
  CANCELLED: "Cancelled",
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const getCustomerName = (order) => {
  if (typeof order.customer === "string") {
    return order.customer;
  }

  return order.customer?.name || order.customer?.email || "Customer";
};

const getProductNames = (order) => {
  const names = (order.products || [])
    .map((item) => item.productId?.name || item.productId?.sku)
    .filter(Boolean);

  return names.length ? names.join(", ") : "Order products";
};

const getOrderId = (order) => order?._id || order?.id;

const getApiErrorMessage = (error, fallback) => {
  const status = error.response?.status;
  const message = error.response?.data?.message || error.message || fallback;

  return status ? `${message} (HTTP ${status})` : message;
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingId, setEditingId] = useState("");
  const [editForm, setEditForm] = useState({
    paymentStatus: "PENDING",
    orderStatus: "PLACED",
  });
  const [deletingId, setDeletingId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getOrders();
      setOrders(Array.isArray(response.orders) ? response.orders : []);
    } catch (err) {
      setError(err.response?.data?.message || "Orders load failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const orderRows = useMemo(
    () =>
      orders.map((order, index) => ({
        ...order,
        displayId:
          order.orderNumber || `#ORD${String(index + 1).padStart(3, "0")}`,
        customerName: getCustomerName(order),
        productName: getProductNames(order),
        amount: formatCurrency(order.totalAmount),
        paymentLabel: paymentLabels[order.paymentStatus] || "Pending",
        statusLabel: statusLabels[order.orderStatus] || "Processing",
        image: `https://i.pravatar.cc/150?u=${order._id || index}`,
      })),
    [orders],
  );

  const filteredOrders = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return orderRows.filter((order) => {
      const matchesSearch =
        !query ||
        [
          order.displayId,
          order.customerName,
          order.productName,
          order.paymentLabel,
          order.statusLabel,
        ].some((value) => String(value || "").toLowerCase().includes(query));
      const matchesPayment =
        paymentFilter === "all" || order.paymentStatus === paymentFilter;
      const matchesStatus =
        statusFilter === "all" || order.orderStatus === statusFilter;

      return matchesSearch && matchesPayment && matchesStatus;
    });
  }, [orderRows, paymentFilter, searchTerm, statusFilter]);

  const stats = useMemo(
    () => ({
      total: orderRows.length,
      delivered: orderRows.filter((order) => order.orderStatus === "COMPLETED")
        .length,
      processing: orderRows.filter((order) => order.orderStatus === "PLACED")
        .length,
      cancelled: orderRows.filter((order) => order.orderStatus === "CANCELLED")
        .length,
    }),
    [orderRows],
  );

  const startEdit = (order) => {
    const orderId = getOrderId(order);

    if (!orderId) {
      setError("Order id is missing. This order cannot be edited.");
      return;
    }

    setEditingId(orderId);
    setEditForm({
      paymentStatus: order.paymentStatus || "PENDING",
      orderStatus: order.orderStatus || "PLACED",
    });
    setMessage("");
    setError("");
  };

  const cancelEdit = () => {
    setEditingId("");
    setEditForm({
      paymentStatus: "PENDING",
      orderStatus: "PLACED",
    });
  };

  const handleUpdate = async (id) => {
    if (!id) {
      setError("Order id is missing. This order cannot be updated.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      setMessage("");

      const response = await updateOrder(id, editForm);
      const updatedOrder = response.order || response.data || {
        ...orders.find((order) => getOrderId(order) === id),
        ...editForm,
      };

      setOrders((current) =>
        current.map((order) => (getOrderId(order) === id ? updatedOrder : order)),
      );
      setMessage("Order updated successfully");
      cancelEdit();
    } catch (err) {
      setError(err.response?.data?.message || "Order update failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      setError("Order id is missing. This order cannot be deleted.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setMessage("");
      const response = await deleteOrder(id);

      if (response?.success === false) {
        throw new Error(response.message || "Order delete failed");
      }

      setOrders((current) => current.filter((order) => getOrderId(order) !== id));
      if (editingId === id) {
        cancelEdit();
      }
      setMessage("Order deleted successfully");
      await loadOrders();
    } catch (err) {
      setError(getApiErrorMessage(err, "Order delete failed"));
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">
      <Sidebar />

      <div className="ml-[280px] w-full">
        <div className="bg-white px-10 py-6 flex justify-between items-center border-b">
          <div className="relative w-[420px]">
            <FaSearch className="absolute top-5 left-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="relative">
              <FaBell className="text-3xl text-gray-600" />

              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">
                4
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="/Rutika.jpg.jpeg"
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-xl">Rutika Pujari</h3>
                <p className="text-gray-500">Manager</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-6xl font-bold text-[#061539]">Orders</h1>

              <p className="text-gray-500 text-xl mt-3">
                Manage customer orders and track deliveries.
              </p>
            </div>
          </div>

          {message && (
            <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl mb-6 font-semibold">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 px-5 py-3 rounded-2xl mb-6 font-semibold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-4 gap-8 mb-10">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-xl">Total Orders</p>
                  <h1 className="text-5xl font-bold mt-4">{stats.total}</h1>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-4xl">
                  <FaShoppingCart />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-xl">Delivered</p>
                  <h1 className="text-5xl font-bold mt-4">
                    {stats.delivered}
                  </h1>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-4xl">
                  <FaCheckCircle />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-xl">Processing</p>
                  <h1 className="text-5xl font-bold mt-4">
                    {stats.processing}
                  </h1>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-4xl">
                  <FaClock />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-xl">Cancelled</p>
                  <h1 className="text-5xl font-bold mt-4">
                    {stats.cancelled}
                  </h1>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 text-4xl">
                  <FaTimesCircle />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 flex items-center gap-5 mb-8 shadow-sm">
            <div className="relative flex-1">
              <FaSearch className="absolute top-5 left-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search order..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
              />
            </div>

            <select
              value={paymentFilter}
              onChange={(event) => setPaymentFilter(event.target.value)}
              className="px-6 py-4 rounded-2xl border border-gray-200 bg-[#f5f7fb] text-lg"
            >
              <option value="all">All Payment</option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="px-6 py-4 rounded-2xl border border-gray-200 bg-[#f5f7fb] text-lg"
            >
              <option value="all">All Status</option>
              <option value="COMPLETED">Delivered</option>
              <option value="PLACED">Processing</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="bg-white rounded-3xl overflow-x-auto shadow-sm">
            <table className="min-w-[980px] w-full table-auto">
              <thead className="bg-[#f8f9fc] text-gray-500 text-lg">
                <tr>
                  <th className="p-6 text-left min-w-[280px]">CUSTOMER</th>
                  <th className="p-6 text-left min-w-[220px]">PRODUCT</th>
                  <th className="p-6 text-left">AMOUNT</th>
                  <th className="p-6 text-left">PAYMENT</th>
                  <th className="p-6 text-left">STATUS</th>
                  <th className="p-6 text-left">ACTION</th>
                </tr>
              </thead>

              <tbody>
                {isLoading && (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="6">
                      Orders loading...
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  filteredOrders.map((order) => {
                    const orderId = getOrderId(order);

                    return (
                    <tr
                      key={orderId || order.displayId}
                      className="border-t hover:bg-[#f8f9fc] transition-all duration-300"
                    >
                      <td className="p-6 min-w-[280px]">
                        <div className="flex items-center gap-5">
                          <img
                            src={order.image}
                            alt=""
                            className="w-20 h-20 shrink-0 rounded-2xl object-cover"
                          />

                          <div className="min-w-0">
                            <h3 className="font-bold text-2xl text-[#061539] break-words leading-tight">
                              {order.customerName}
                            </h3>

                            <p className="text-gray-500 mt-2 break-words">
                              {order.displayId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-6 min-w-[220px] text-xl font-medium break-words leading-snug">
                        {order.productName}
                      </td>

                      <td className="p-6 text-2xl font-bold">
                        {order.amount}
                      </td>

                      <td className="p-6">
                        {editingId === orderId ? (
                          <select
                            value={editForm.paymentStatus}
                            onChange={(event) =>
                              setEditForm((current) => ({
                                ...current,
                                paymentStatus: event.target.value,
                              }))
                            }
                            className="px-4 py-3 rounded-xl border border-gray-200 bg-[#f5f7fb]"
                          >
                            <option value="PAID">Paid</option>
                            <option value="PENDING">Pending</option>
                            <option value="FAILED">Failed</option>
                          </select>
                        ) : (
                          <span
                            className={`px-5 py-3 rounded-xl text-lg font-medium ${
                              order.paymentLabel === "Paid"
                                ? "bg-green-100 text-green-700"
                                : order.paymentLabel === "Pending"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.paymentLabel}
                          </span>
                        )}
                      </td>

                      <td className="p-6">
                        {editingId === orderId ? (
                          <select
                            value={editForm.orderStatus}
                            onChange={(event) =>
                              setEditForm((current) => ({
                                ...current,
                                orderStatus: event.target.value,
                              }))
                            }
                            className="px-4 py-3 rounded-xl border border-gray-200 bg-[#f5f7fb]"
                          >
                            <option value="COMPLETED">Delivered</option>
                            <option value="PLACED">Processing</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`px-5 py-3 rounded-xl text-lg font-medium ${
                              order.statusLabel === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : order.statusLabel === "Processing"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.statusLabel}
                          </span>
                        )}
                      </td>

                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          {editingId === orderId ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleUpdate(orderId)}
                                disabled={isSaving || !orderId}
                                className="px-5 h-14 rounded-xl bg-blue-600 text-white font-semibold disabled:opacity-60"
                              >
                                Save
                              </button>

                              <button
                                type="button"
                                onClick={cancelEdit}
                                className="px-5 h-14 rounded-xl border text-gray-600 font-semibold"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => startEdit(order)}
                              className="w-14 h-14 rounded-xl border flex items-center justify-center text-blue-600 hover:bg-blue-50"
                            >
                              <FaEdit />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDelete(orderId)}
                            disabled={deletingId === orderId || !orderId}
                            className="w-14 h-14 rounded-xl border flex items-center justify-center text-red-500 hover:bg-red-50 disabled:opacity-60"
                          >
                            <FaTrash />
                          </button>

                          <button
                            type="button"
                            className="w-14 h-14 rounded-xl border flex items-center justify-center text-gray-500 hover:bg-gray-50"
                          >
                            <FaEllipsisV />
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })}

                {!isLoading && filteredOrders.length === 0 && (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="6">
                      Order data is not available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center p-8 border-t">
              <p className="text-gray-500 text-lg">
                Showing {filteredOrders.length} of {orderRows.length} orders
              </p>

              <div className="flex items-center gap-4">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`w-14 h-14 rounded-xl text-lg font-semibold ${
                      page === 1 ? "bg-blue-600 text-white" : "border"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
