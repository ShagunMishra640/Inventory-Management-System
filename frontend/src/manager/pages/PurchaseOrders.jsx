import Sidebar from "../components/Sidebar";
import {
  FaBell,
  FaSearch,
  FaPlus,
  FaFilter,
  FaShoppingCart,
  FaTruck,
  FaCheckCircle,
  FaRupeeSign,
  FaEye,
  FaEdit,
} from "react-icons/fa";

const purchaseOrders = [
  {
    id: "PO-1001",
    supplier: "ABC Electronics",
    date: "12 Aug 2025",
    items: 25,
    amount: "₹45,000",
    status: "Pending",
  },
  {
    id: "PO-1002",
    supplier: "Tech World",
    date: "10 Aug 2025",
    items: 18,
    amount: "₹32,500",
    status: "Received",
  },
  {
    id: "PO-1003",
    supplier: "Furniture Hub",
    date: "08 Aug 2025",
    items: 12,
    amount: "₹28,000",
    status: "Processing",
  },
  {
    id: "PO-1004",
    supplier: "Office Supplies",
    date: "05 Aug 2025",
    items: 30,
    amount: "₹60,000",
    status: "Received",
  },
];

const PurchaseOrders = () => {
  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Sidebar />

      <div className="ml-[280px] flex-1">

        {/* HEADER */}

        <div className="bg-white px-10 py-6 border-b flex justify-between items-center">

          <div>
            <h1 className="text-5xl font-bold text-[#061539]">
              Purchase Orders
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Manage supplier orders and inventory purchases
            </p>
          </div>

          <div className="flex items-center gap-6">

            <div className="relative">
              <FaBell className="text-3xl text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-6 w-6 rounded-full flex items-center justify-center">
                6
              </span>
            </div>

            <img
              src="/Rutika.jpg.jpeg"
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />
          </div>
        </div>

        <div className="p-10">

          {/* STATS */}

          <div className="grid grid-cols-4 gap-6 mb-10">

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Total Orders</p>
                  <h2 className="text-4xl font-bold mt-2">245</h2>
                </div>
                <FaShoppingCart className="text-5xl text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Pending</p>
                  <h2 className="text-4xl font-bold mt-2">18</h2>
                </div>
                <FaTruck className="text-5xl text-orange-500" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Received</p>
                  <h2 className="text-4xl font-bold mt-2">210</h2>
                </div>
                <FaCheckCircle className="text-5xl text-green-600" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Purchase Value</p>
                  <h2 className="text-3xl font-bold mt-2">₹12.5L</h2>
                </div>
                <FaRupeeSign className="text-5xl text-purple-600" />
              </div>
            </div>

          </div>

          {/* SEARCH BAR */}

          <div className="bg-white p-6 rounded-3xl shadow-sm mb-8 flex justify-between items-center">

            <div className="relative w-[450px]">

              <FaSearch className="absolute top-4 left-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search purchase order..."
                className="w-full bg-[#f4f7fe] border rounded-xl py-3 pl-12 pr-4 outline-none"
              />
            </div>

            <div className="flex gap-4">

              <button className="bg-gray-100 px-6 py-3 rounded-xl flex items-center gap-2">
                <FaFilter />
                Filter
              </button>

              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
                <FaPlus />
                Create PO
              </button>

            </div>
          </div>

          {/* PURCHASE TABLE */}

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

            <div className="px-8 py-6 border-b">
              <h2 className="text-2xl font-bold">
                Purchase Order List
              </h2>
            </div>

            <table className="w-full">

              <thead className="bg-[#f8faff]">

                <tr>
                  <th className="p-5 text-left">PO ID</th>
                  <th className="p-5 text-left">Supplier</th>
                  <th className="p-5 text-left">Date</th>
                  <th className="p-5 text-left">Items</th>
                  <th className="p-5 text-left">Amount</th>
                  <th className="p-5 text-left">Status</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>

              </thead>

              <tbody>

                {purchaseOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">

                    <td className="p-5 font-semibold">
                      {order.id}
                    </td>

                    <td className="p-5">
                      {order.supplier}
                    </td>

                    <td className="p-5">
                      {order.date}
                    </td>

                    <td className="p-5">
                      {order.items}
                    </td>

                    <td className="p-5 font-semibold">
                      {order.amount}
                    </td>

                    <td className="p-5">

                      <span
                        className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                          order.status === "Received"
                            ? "bg-green-100 text-green-600"
                            : order.status === "Pending"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {order.status}
                      </span>

                    </td>

                    <td className="p-5">

                      <div className="flex justify-center gap-3">

                        <button className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                          <FaEye />
                        </button>

                        <button className="bg-green-100 text-green-600 p-3 rounded-xl">
                          <FaEdit />
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* BOTTOM SECTION */}

          <div className="grid grid-cols-2 gap-8 mt-10">

            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <h2 className="text-2xl font-bold mb-6">
                Recent Purchase Activity
              </h2>

              <div className="space-y-4">

                <div className="bg-green-50 p-4 rounded-xl">
                  PO-1002 received successfully.
                </div>

                <div className="bg-blue-50 p-4 rounded-xl">
                  New purchase order created.
                </div>

                <div className="bg-orange-50 p-4 rounded-xl">
                  Supplier shipment in transit.
                </div>

                <div className="bg-purple-50 p-4 rounded-xl">
                  Inventory updated from received order.
                </div>

              </div>

            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white">

              <h2 className="text-3xl font-bold">
                Purchase Summary
              </h2>

              <p className="mt-3 text-blue-100">
                Monitor supplier purchases and stock replenishment.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex justify-between">
                  <span>This Month</span>
                  <span>₹4,50,000</span>
                </div>

                <div className="flex justify-between">
                  <span>Pending Orders</span>
                  <span>18</span>
                </div>

                <div className="flex justify-between">
                  <span>Received Orders</span>
                  <span>210</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PurchaseOrders;