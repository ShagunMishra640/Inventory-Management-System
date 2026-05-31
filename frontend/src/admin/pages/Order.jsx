import React, { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../controllers/orderController";

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
      setOrders(Array.isArray(data) ? data : (data.data ?? []));
    } catch (err) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this order?")) return;
    try {
      await deleteOrder(id);
      setOrders((o) => o.filter((x) => x.id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-gray-500">View and manage customer orders.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-4" colSpan={6}>
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="p-4 text-red-600" colSpan={6}>
                  {error}
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td className="p-4" colSpan={6}>
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b last:border-b-0 hover:bg-slate-50"
                >
                  <td className="p-3 font-bold">{order.id}</td>
                  <td className="p-3">
                    {order.customerName ?? order.customer ?? "—"}
                  </td>
                  <td className="p-3">
                    {order.items ?? order.itemCount ?? "—"}
                  </td>
                  <td className="p-3">{order.total ?? "—"}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                      {order.status ?? "Pending"}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button className="rounded-xl bg-amber-500 text-white px-3 py-1 text-sm">
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="rounded-xl bg-red-600 text-white px-3 py-1 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
