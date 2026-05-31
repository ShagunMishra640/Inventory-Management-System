import Sidebar from "../components/Sidebar";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaBell,
  FaBoxes,
  FaExclamationTriangle,
  FaWarehouse,
  FaCheckCircle,
} from "react-icons/fa";

const inventory = [
  {
    id: "#INV001",
    name: "MacBook Pro 16",
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
    category: "Laptops",
    quantity: 25,
    warehouse: "Warehouse A",
    status: "Available",
  },

  {
    id: "#INV002",
    name: "Sony WH-1000XM5",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90",
    category: "Electronics",
    quantity: 8,
    warehouse: "Warehouse B",
    status: "Low Stock",
  },

  {
    id: "#INV003",
    name: "Mechanical Keyboard",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
    category: "Accessories",
    quantity: 60,
    warehouse: "Warehouse A",
    status: "Available",
  },

  {
    id: "#INV004",
    name: "Wireless Mouse",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db",
    category: "Accessories",
    quantity: 0,
    warehouse: "Warehouse C",
    status: "Out of Stock",
  },
];

const Inventory = () => {
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
              placeholder="Search inventory..."
              className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
            />
          </div>

          {/* PROFILE */}

          <div className="flex items-center gap-8">

            <div className="relative">

              <FaBell className="text-3xl text-gray-600" />

              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">
                3
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
                  Manager
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
                Inventory
              </h1>

              <p className="text-gray-500 text-xl mt-3">
                Track stock levels and manage warehouse inventory.
              </p>

            </div>

            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-105 transition-all duration-300 text-white px-8 py-5 rounded-2xl flex items-center gap-4 text-xl font-semibold shadow-xl">

              <FaPlus />

              Add Inventory
            </button>
          </div>

          {/* STATS */}

          <div className="grid grid-cols-4 gap-8 mb-10">

            {/* CARD 1 */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Total Items
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    320
                  </h1>

                </div>

                <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-4xl">

                  <FaBoxes />
                </div>
              </div>
            </div>

            {/* CARD 2 */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Available
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    250
                  </h1>

                </div>

                <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-4xl">

                  <FaCheckCircle />
                </div>
              </div>
            </div>

            {/* CARD 3 */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Low Stock
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    45
                  </h1>

                </div>

                <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-4xl">

                  <FaExclamationTriangle />
                </div>
              </div>
            </div>

            {/* CARD 4 */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Warehouses
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    12
                  </h1>

                </div>

                <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-4xl">

                  <FaWarehouse />
                </div>
              </div>
            </div>
          </div>

          {/* FILTER */}

          <div className="bg-white rounded-3xl p-6 flex items-center gap-5 mb-8 shadow-sm">

            <div className="relative flex-1">

              <FaSearch className="absolute top-5 left-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search inventory..."
                className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
              />
            </div>

            <select className="px-6 py-4 rounded-2xl border border-gray-200 bg-[#f5f7fb] text-lg">

              <option>All Categories</option>

            </select>

            <select className="px-6 py-4 rounded-2xl border border-gray-200 bg-[#f5f7fb] text-lg">

              <option>All Status</option>

            </select>
          </div>

          {/* TABLE */}

          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">

            <table className="w-full">

              <thead className="bg-[#f8f9fc] text-gray-500 text-lg">

                <tr>

                  <th className="p-6 text-left">
                    PRODUCT
                  </th>

                  <th className="p-6 text-left">
                    CATEGORY
                  </th>

                  <th className="p-6 text-left">
                    QUANTITY
                  </th>

                  <th className="p-6 text-left">
                    WAREHOUSE
                  </th>

                  <th className="p-6 text-left">
                    STATUS
                  </th>

                  <th className="p-6 text-left">
                    ACTION
                  </th>

                </tr>
              </thead>

              <tbody>

                {inventory.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-[#f8f9fc] transition-all duration-300"
                  >

                    {/* PRODUCT */}

                    <td className="p-6">

                      <div className="flex items-center gap-5">

                        <img
                          src={item.image}
                          alt=""
                          className="w-20 h-20 rounded-2xl object-cover"
                        />

                        <div>

                          <h3 className="font-bold text-2xl text-[#061539]">
                            {item.name}
                          </h3>

                          <p className="text-gray-500 mt-2">
                            {item.id}
                          </p>

                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}

                    <td className="p-6">

                      <span className="bg-purple-100 text-purple-700 px-5 py-3 rounded-xl text-lg">

                        {item.category}

                      </span>
                    </td>

                    {/* QUANTITY */}

                    <td className="p-6 text-2xl font-bold">

                      {item.quantity}

                    </td>

                    {/* WAREHOUSE */}

                    <td className="p-6 text-xl">

                      {item.warehouse}

                    </td>

                    {/* STATUS */}

                    <td className="p-6">

                      <span
                        className={`px-5 py-3 rounded-xl text-lg font-medium ${
                          item.status === "Available"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Low Stock"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* ACTION */}

                    <td className="p-6">

                      <div className="flex items-center gap-4">

                        <button className="w-14 h-14 rounded-xl border flex items-center justify-center text-blue-600 hover:bg-blue-50">

                          <FaEdit />
                        </button>

                        <button className="w-14 h-14 rounded-xl border flex items-center justify-center text-red-500 hover:bg-red-50">

                          <FaTrash />
                        </button>

                        <button className="w-14 h-14 rounded-xl border flex items-center justify-center text-gray-500 hover:bg-gray-50">

                          <FaEllipsisV />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}

            <div className="flex justify-between items-center p-8 border-t">

              <p className="text-gray-500 text-lg">
                Showing 1 to 4 of 320 inventory items
              </p>

              <div className="flex items-center gap-4">

                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`w-14 h-14 rounded-xl text-lg font-semibold ${
                      page === 1
                        ? "bg-blue-600 text-white"
                        : "border"
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

export default Inventory;