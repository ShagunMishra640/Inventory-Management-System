import {
  FaArrowUp,
  FaArrowDown,
  FaUsers,
  FaShoppingCart,
  FaBoxOpen,
  FaDollarSign,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import profileImage from "../../assets/rutika-profile.jpeg";

const Dashboard = () => {
  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">
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
              placeholder="Search here..."
              className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
            />
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-8">

            <div className="relative">

              <FaBell className="text-3xl text-gray-600" />

              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">
                8
              </div>
            </div>

            <div className="flex items-center gap-4">

              <img
                src={profileImage}
                alt="Rutika Pujari"
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

          <div className="mb-10">

            <h1 className="text-6xl font-bold text-[#061539]">
              Dashboard
            </h1>

            <p className="text-gray-500 text-xl mt-3">
              Welcome back, manage your business efficiently.
            </p>
          </div>

          {/* STATS */}

          <div className="grid grid-cols-4 gap-8 mb-10">

            {/* CARD 1 */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-gray-500 text-xl">
                    Total Revenue
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    ₹8.5L
                  </h1>

                  <div className="flex items-center gap-2 text-green-600 mt-4 text-lg font-medium">
                    <FaArrowUp />
                    +12.5%
                  </div>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-4xl">
                  <FaDollarSign />
                </div>
              </div>
            </div>

            {/* CARD 2 */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-gray-500 text-xl">
                    Orders
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    1,250
                  </h1>

                  <div className="flex items-center gap-2 text-green-600 mt-4 text-lg font-medium">
                    <FaArrowUp />
                    +8.2%
                  </div>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-4xl">
                  <FaShoppingCart />
                </div>
              </div>
            </div>

            {/* CARD 3 */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-gray-500 text-xl">
                    Products
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    320
                  </h1>

                  <div className="flex items-center gap-2 text-red-500 mt-4 text-lg font-medium">
                    <FaArrowDown />
                    -2.4%
                  </div>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-4xl">
                  <FaBoxOpen />
                </div>
              </div>
            </div>

            {/* CARD 4 */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-gray-500 text-xl">
                    Customers
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    2,450
                  </h1>

                  <div className="flex items-center gap-2 text-green-600 mt-4 text-lg font-medium">
                    <FaArrowUp />
                    +18.7%
                  </div>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-4xl">
                  <FaUsers />
                </div>
              </div>
            </div>
          </div>

          {/* CHART + RECENT ORDERS */}

          <div className="grid grid-cols-3 gap-8">

            {/* SALES CHART */}

            <div className="col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center mb-10">

                <div>

                  <h2 className="text-3xl font-bold text-[#061539]">
                    Sales Analytics
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Monthly sales overview
                  </p>
                </div>

                <button className="px-6 py-3 rounded-2xl bg-[#f5f7fb] border">
                  This Month
                </button>
              </div>

              {/* FAKE CHART */}

              <div className="flex items-end gap-6 h-[300px]">

                {[120, 180, 140, 250, 200, 280, 240].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-3xl"
                      style={{ height: `${height}px` }}
                    ></div>
                  )
                )}
              </div>

              <div className="flex justify-between mt-6 text-gray-500 text-lg">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* RECENT ACTIVITY */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <h2 className="text-3xl font-bold text-[#061539] mb-8">
                Recent Activity
              </h2>

              <div className="space-y-8">

                {[
                  "New order received",
                  "Product stock updated",
                  "New customer added",
                  "Payment successful",
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex gap-4"
                  >

                    <div className="w-4 h-4 rounded-full bg-blue-600 mt-2"></div>

                    <div>
                      <h3 className="font-semibold text-lg">
                        {activity}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        2 mins ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RECENT ORDERS */}

          <div className="bg-white rounded-3xl mt-10 p-8 shadow-sm border border-gray-100">

            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-3xl font-bold text-[#061539]">
                  Recent Orders
                </h2>

                <p className="text-gray-500 mt-2">
                  Latest customer purchases
                </p>
              </div>

              <button className="px-6 py-3 rounded-2xl bg-blue-600 text-white">
                View All
              </button>
            </div>

            <table className="w-full">

              <thead className="text-gray-500 border-b">

                <tr>
                  <th className="text-left py-5">Customer</th>
                  <th className="text-left py-5">Product</th>
                  <th className="text-left py-5">Amount</th>
                  <th className="text-left py-5">Status</th>
                </tr>
              </thead>

              <tbody>

                {[
                  {
                    customer: "Rahul Sharma",
                    product: "MacBook Pro",
                    amount: "₹1,59,900",
                    status: "Completed",
                  },

                  {
                    customer: "Sneha Patil",
                    product: "Gaming Keyboard",
                    amount: "₹4,999",
                    status: "Pending",
                  },

                  {
                    customer: "Amit Joshi",
                    product: "Monitor",
                    amount: "₹22,499",
                    status: "Completed",
                  },
                ].map((order, index) => (
                  <tr
                    key={index}
                    className="border-b"
                  >

                    <td className="py-6 font-semibold">
                      {order.customer}
                    </td>

                    <td className="py-6">
                      {order.product}
                    </td>

                    <td className="py-6 font-bold">
                      {order.amount}
                    </td>

                    <td className="py-6">

                      <span
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


