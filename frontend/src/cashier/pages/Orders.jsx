import { useState } from "react";

function Orders() {
  // SAMPLE DATA (later replace with API)
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "John Doe",
      products: [
        { name: "Rice", qty: 2 },
        { name: "Sugar", qty: 1 },
      ],
      total: 450,
      paymentStatus: "Pending",
      orderStatus: "Processing",
      date: "2026-05-29",
    },
    {
      id: "ORD002",
      customer: "Amit Sharma",
      products: [{ name: "Oil", qty: 1 }],
      total: 120,
      paymentStatus: "Paid",
      orderStatus: "Completed",
      date: "2026-05-28",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // FILTER LOGIC
  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All" || order.orderStatus === filter;

    return matchSearch && matchFilter;
  });

  // QUICK ACTIONS
  const markPaid = (id) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, paymentStatus: "Paid" } : o)),
    );
  };

  const cancelOrder = (id) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, orderStatus: "Cancelled" } : o)),
    );
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* SEARCH + FILTER */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/2"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">₹ {order.total}</td>
                <td className="p-3">{order.paymentStatus}</td>
                <td className="p-3">{order.orderStatus}</td>
                <td className="p-3">{order.date}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => markPaid(order.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Paid
                  </button>

                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-3">Order Details</h2>

            <p>
              <b>ID:</b> {selectedOrder.id}
            </p>
            <p>
              <b>Customer:</b> {selectedOrder.customer}
            </p>
            <p>
              <b>Status:</b> {selectedOrder.orderStatus}
            </p>

            <div className="mt-3">
              <b>Products:</b>
              <ul className="list-disc ml-5">
                {selectedOrder.products.map((p, i) => (
                  <li key={i}>
                    {p.name} - {p.qty}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-2">
              <b>Total:</b> ₹ {selectedOrder.total}
            </p>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 bg-gray-700 text-white px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
