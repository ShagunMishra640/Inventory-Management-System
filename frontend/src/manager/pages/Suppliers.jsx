import Sidebar from "../components/Sidebar";
import {
  FaBell,
  FaSearch,
  FaPlus,
  FaPhone,
  FaEnvelope,
  FaTruck,
  FaStar,
  FaEdit,
  FaTrash,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";

const suppliers = [
  {
    id: "SUP001",
    name: "ABC Electronics",
    contact: "+91 9876543210",
    email: "abc@gmail.com",
    products: 125,
    rating: 4.8,
    status: "Active",
  },
  {
    id: "SUP002",
    name: "Tech World",
    contact: "+91 8765432109",
    email: "tech@gmail.com",
    products: 98,
    rating: 4.6,
    status: "Active",
  },
  {
    id: "SUP003",
    name: "Furniture Hub",
    contact: "+91 7654321098",
    email: "hub@gmail.com",
    products: 65,
    rating: 4.4,
    status: "Pending",
  },
  {
    id: "SUP004",
    name: "Office Supplies",
    contact: "+91 6543210987",
    email: "office@gmail.com",
    products: 180,
    rating: 4.9,
    status: "Active",
  },
];

const Suppliers = () => {
  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Sidebar />

      <div className="ml-[280px] flex-1">

        {/* HEADER */}

        <div className="bg-white px-10 py-6 border-b flex justify-between items-center">

          <div>
            <h1 className="text-5xl font-bold text-[#061539]">
              Suppliers
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Manage vendors, suppliers and procurement partners
            </p>
          </div>

          <div className="flex items-center gap-6">

            <div className="relative">
              <FaBell className="text-3xl text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-6 w-6 rounded-full flex items-center justify-center">
                4
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
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Total Suppliers</p>
                  <h2 className="text-4xl font-bold mt-2">48</h2>
                </div>
                <FaUsers className="text-5xl text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Active</p>
                  <h2 className="text-4xl font-bold mt-2">42</h2>
                </div>
                <FaCheckCircle className="text-5xl text-green-600" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Pending Deliveries</p>
                  <h2 className="text-4xl font-bold mt-2">16</h2>
                </div>
                <FaTruck className="text-5xl text-orange-500" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Purchase Value</p>
                  <h2 className="text-3xl font-bold mt-2">₹18.5L</h2>
                </div>
                <FaRupeeSign className="text-5xl text-purple-600" />
              </div>
            </div>

          </div>

          {/* SEARCH */}

          <div className="bg-white p-6 rounded-3xl shadow-sm mb-8 flex justify-between items-center">

            <div className="relative w-[450px]">
              <FaSearch className="absolute top-4 left-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search supplier..."
                className="w-full bg-[#f4f7fe] border rounded-xl py-3 pl-12 pr-4 outline-none"
              />
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <FaPlus />
              Add Supplier
            </button>

          </div>

          {/* SUPPLIER CARDS */}

          <div className="grid grid-cols-4 gap-6 mb-10">

            {suppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
              >

                <div className="flex items-center gap-4 mb-4">

                  <img
                    src={`https://ui-avatars.com/api/?name=${supplier.name}`}
                    alt=""
                    className="w-14 h-14 rounded-full"
                  />

                  <div>
                    <h3 className="font-bold text-lg">
                      {supplier.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {supplier.id}
                    </p>
                  </div>

                </div>

                <div className="space-y-2 text-sm">

                  <div className="flex items-center gap-2">
                    <FaPhone className="text-blue-500" />
                    {supplier.contact}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-green-500" />
                    {supplier.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    {supplier.rating}
                  </div>

                </div>

                <div className="mt-5 flex justify-between items-center">

                  <span
                    className={`px-3 py-1 rounded-lg text-sm ${
                      supplier.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {supplier.status}
                  </span>

                  <span className="font-semibold">
                    {supplier.products} Products
                  </span>

                </div>

              </div>
            ))}

          </div>

          {/* TABLE */}

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

            <div className="px-8 py-6 border-b">
              <h2 className="text-2xl font-bold">
                Supplier Directory
              </h2>
            </div>

            <table className="w-full">

              <thead className="bg-[#f8faff]">
                <tr>
                  <th className="p-5 text-left">Supplier</th>
                  <th className="p-5 text-left">Contact</th>
                  <th className="p-5 text-left">Email</th>
                  <th className="p-5 text-left">Products</th>
                  <th className="p-5 text-left">Rating</th>
                  <th className="p-5 text-left">Status</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>

                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b">

                    <td className="p-5 font-semibold">
                      {supplier.name}
                    </td>

                    <td className="p-5">
                      {supplier.contact}
                    </td>

                    <td className="p-5">
                      {supplier.email}
                    </td>

                    <td className="p-5">
                      {supplier.products}
                    </td>

                    <td className="p-5">
                      ⭐ {supplier.rating}
                    </td>

                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-lg ${
                          supplier.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {supplier.status}
                      </span>
                    </td>

                    <td className="p-5">

                      <div className="flex justify-center gap-3">

                        <button className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                          <FaEdit />
                        </button>

                        <button className="bg-red-100 text-red-600 p-3 rounded-xl">
                          <FaTrash />
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
                Recent Activities
              </h2>

              <div className="space-y-4">

                <div className="bg-green-50 p-4 rounded-xl">
                  New supplier registered successfully.
                </div>

                <div className="bg-blue-50 p-4 rounded-xl">
                  Purchase order assigned to Tech World.
                </div>

                <div className="bg-orange-50 p-4 rounded-xl">
                  Pending delivery reminder sent.
                </div>

                <div className="bg-purple-50 p-4 rounded-xl">
                  Supplier rating updated.
                </div>

              </div>

            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white">

              <h2 className="text-3xl font-bold">
                Supplier Summary
              </h2>

              <p className="mt-3 text-blue-100">
                Monitor supplier performance and procurement operations.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex justify-between">
                  <span>Top Supplier</span>
                  <span>Office Supplies</span>
                </div>

                <div className="flex justify-between">
                  <span>Average Rating</span>
                  <span>4.7 ⭐</span>
                </div>

                <div className="flex justify-between">
                  <span>Active Vendors</span>
                  <span>42</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Suppliers;