import { useState } from "react";

function Orders() {
  const [orders] = useState([
    {
      id: "ORD001",
      customer: "Rahul",
      amount: 450,
      status: "Paid",
      date: "2026-05-29",
    },
    {
      id: "ORD002",
      customer: "Priya",
      amount: 320,
      status: "Pending",
      date: "2026-05-28",
    },
  ]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || order.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-gray-500">
            View, print, refund, and manage order status.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Orders"
            className="border rounded-2xl px-4 py-3"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-2xl px-4 py-3"
          >
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b last:border-b-0">
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">₹{order.amount}</td>
                <td className="p-4">{order.status}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4 flex flex-wrap gap-2">
                  <button className="rounded-2xl bg-blue-600 text-white px-3 py-2">
                    View
                  </button>
                  <button className="rounded-2xl bg-indigo-600 text-white px-3 py-2">
                    Print
                  </button>
                  <button className="rounded-2xl bg-red-600 text-white px-3 py-2">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
