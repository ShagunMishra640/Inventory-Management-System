const orders = [
  {
    id: "#1001",
    customer: "Rahul",
    amount: "₹5000",
    status: "Completed",
  },
  {
    id: "#1002",
    customer: "Priya",
    amount: "₹2500",
    status: "Pending",
  },
];

const OrdersTable = () => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          Recent Orders
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
          <tr>
            <th className="p-5 text-left">Order ID</th>
            <th className="p-5 text-left">Customer</th>
            <th className="p-5 text-left">Amount</th>
            <th className="p-5 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => (
            <tr
              key={index}
              className="border-b hover:bg-purple-50 transition-all duration-300"
            >
              <td className="p-5 font-semibold">{order.id}</td>
              <td className="p-5">{order.customer}</td>
              <td className="p-5">{order.amount}</td>

              <td className="p-5">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    order.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;