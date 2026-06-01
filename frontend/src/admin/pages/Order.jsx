import React, { useEffect, useState } from "react";
import { RefreshCw, Trash2 } from "lucide-react";
import { getOrders, deleteOrder } from "../controllers/orderController";

const formatCustomer = (customer) => {
  if (!customer) return "-";
  if (typeof customer === "string") return customer;
  return customer.name || customer.email || customer.phone || customer._id || "-";
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    setError(null);

    try {
      const res = await getOrders();
      const data = res?.data ?? res;
      setOrders(Array.isArray(data) ? data : data.orders ?? data.data ?? []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this order?")) return;

    try {
      await deleteOrder(id);
      setOrders((current) => current.filter((order) => (order._id || order.id) !== id));
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Failed to delete order");
    }
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
          <p className="text-slate-600">View and manage customer orders.</p>
        </div>
        <button
          type="button"
          onClick={fetchOrders}
          className="rounded-2xl bg-white border border-slate-200 px-5 py-2.5 font-bold text-slate-700 flex items-center gap-2 shadow-sm hover:bg-slate-50"
        >
          <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow overflow-x-auto border border-slate-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-6 text-slate-500" colSpan={7}>
                  Loading orders...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="p-6 text-red-600" colSpan={7}>
                  {error}
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td className="p-6 text-slate-500" colSpan={7}>
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const id = order._id || order.id;
                return (
                  <tr key={id} className="border-b last:border-b-0 hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">
                      {order.orderNumber || id}
                    </td>
                    <td className="p-4 text-slate-700">
                      {order.customerName ?? formatCustomer(order.customer)}
                    </td>
                    <td className="p-4 text-slate-700">
                      {order.items ?? order.itemCount ?? order.products?.length ?? "-"}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      {formatCurrency(order.totalAmount ?? order.total)}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                        {order.paymentStatus || "PENDING"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                        {order.orderStatus || order.status || "PLACED"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(id)}
                        className="rounded-xl bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-sm inline-flex items-center gap-2 transition-colors"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
