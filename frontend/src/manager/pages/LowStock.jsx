import Sidebar from "../components/Sidebar";
import {
  FaBell,
  FaSearch,
  FaExclamationTriangle,
  FaBoxOpen,
  FaShoppingCart,
  FaFilter,
  FaWarehouse,
  FaRedo,
} from "react-icons/fa";

const lowStockProducts = [
  {
    id: "PRD001",
    product: "Gaming Keyboard",
    category: "Electronics",
    stock: 12,
    minimum: 50,
    supplier: "Tech Supplies",
    status: "Critical",
  },
  {
    id: "PRD002",
    product: "Wireless Mouse",
    category: "Electronics",
    stock: 18,
    minimum: 40,
    supplier: "ABC Traders",
    status: "Low",
  },
  {
    id: "PRD003",
    product: "Office Chair",
    category: "Furniture",
    stock: 5,
    minimum: 25,
    supplier: "Furniture Hub",
    status: "Critical",
  },
  {
    id: "PRD004",
    product: "Monitor Stand",
    category: "Accessories",
    stock: 9,
    minimum: 30,
    supplier: "Modern Office",
    status: "Low",
  },
];

const LowStock = () => {
  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Sidebar />

      <div className="ml-[280px] flex-1">

        {/* Header */}

        <div className="bg-white px-10 py-6 border-b flex justify-between items-center">

          <div>
            <h1 className="text-5xl font-bold text-[#061539]">
              Low Stock Alerts
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Monitor products running below minimum inventory levels
            </p>
          </div>

          <div className="flex items-center gap-6">

            <div className="relative">
              <FaBell className="text-3xl text-red-500" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-6 w-6 rounded-full flex items-center justify-center">
                18
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

          {/* Stats Cards */}

          <div className="grid grid-cols-4 gap-6 mb-10">

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Low Stock Items</p>
                  <h2 className="text-4xl font-bold mt-2">18</h2>
                </div>

                <FaBoxOpen className="text-5xl text-orange-500" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Critical Alerts</p>
                  <h2 className="text-4xl font-bold mt-2">7</h2>
                </div>

                <FaExclamationTriangle className="text-5xl text-red-500" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Need Reorder</p>
                  <h2 className="text-4xl font-bold mt-2">12</h2>
                </div>

                <FaShoppingCart className="text-5xl text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Warehouses</p>
                  <h2 className="text-4xl font-bold mt-2">4</h2>
                </div>

                <FaWarehouse className="text-5xl text-green-600" />
              </div>
            </div>

          </div>

          {/* Search */}

          <div className="bg-white p-6 rounded-3xl shadow-sm mb-8 flex justify-between items-center">

            <div className="relative w-[450px]">
              <FaSearch className="absolute top-4 left-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search low stock product..."
                className="w-full bg-[#f4f7fe] border rounded-xl py-3 pl-12 pr-4 outline-none"
              />
            </div>

            <div className="flex gap-4">

              <button className="bg-gray-100 px-6 py-3 rounded-xl flex items-center gap-2">
                <FaFilter />
                Filter
              </button>

              <button className="bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
                <FaRedo />
                Reorder All
              </button>

            </div>
          </div>

          {/* Table */}

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

            <div className="px-8 py-6 border-b">
              <h2 className="text-2xl font-bold">
                Low Stock Products
              </h2>
            </div>

            <table className="w-full">

              <thead className="bg-[#f8faff]">
                <tr>
                  <th className="p-5 text-left">Product ID</th>
                  <th className="p-5 text-left">Product</th>
                  <th className="p-5 text-left">Category</th>
                  <th className="p-5 text-left">Current Stock</th>
                  <th className="p-5 text-left">Minimum Stock</th>
                  <th className="p-5 text-left">Supplier</th>
                  <th className="p-5 text-left">Status</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>

              <tbody>

                {lowStockProducts.map((item) => (
                  <tr key={item.id} className="border-b">

                    <td className="p-5">{item.id}</td>
                    <td className="p-5 font-semibold">{item.product}</td>
                    <td className="p-5">{item.category}</td>
                    <td className="p-5">{item.stock}</td>
                    <td className="p-5">{item.minimum}</td>
                    <td className="p-5">{item.supplier}</td>

                    <td className="p-5">

                      <span
                        className={`px-4 py-2 rounded-xl font-semibold ${
                          item.status === "Critical"
                            ? "bg-red-100 text-red-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td className="p-5 text-center">

                      <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
                        Reorder
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>

          {/* Bottom Section */}

          <div className="grid grid-cols-2 gap-8 mt-10">

            {/* Stock Health */}

            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <h2 className="text-2xl font-bold mb-6">
                Inventory Health
              </h2>

              <div className="space-y-5">

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Healthy Stock</span>
                    <span>82%</span>
                  </div>

                  <div className="bg-gray-200 h-3 rounded-full">
                    <div className="bg-green-500 h-3 rounded-full w-[82%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Low Stock</span>
                    <span>13%</span>
                  </div>

                  <div className="bg-gray-200 h-3 rounded-full">
                    <div className="bg-orange-500 h-3 rounded-full w-[13%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Critical</span>
                    <span>5%</span>
                  </div>

                  <div className="bg-gray-200 h-3 rounded-full">
                    <div className="bg-red-500 h-3 rounded-full w-[5%]"></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Recent Alerts */}

            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <h2 className="text-2xl font-bold mb-6">
                Recent Alerts
              </h2>

              <div className="space-y-4">

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
                  Office Chair stock dropped below minimum level.
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-xl">
                  Wireless Mouse requires reorder soon.
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-xl">
                  Gaming Keyboard stock reaching critical level.
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-xl">
                  Inventory audit completed successfully.
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default LowStock;