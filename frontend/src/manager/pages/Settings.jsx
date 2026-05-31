import Sidebar from "../components/Sidebar";

import {
  FaBell,
  FaSearch,
  FaUserShield,
  FaLock,
  FaWarehouse,
  FaBoxOpen,
  FaChartBar,
  FaDatabase,
  FaPalette,
  FaMoon,
  FaGlobe,
  FaSave,
  FaCamera,
  FaUserCog,
  FaToggleOn,
  FaToggleOff,
  FaShieldAlt,
  FaClipboardCheck,
} from "react-icons/fa";

const Settings = () => {
  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="ml-[280px] w-full">

        {/* TOPBAR */}

        <div className="bg-white border-b px-10 py-6 flex justify-between items-center">

          {/* SEARCH */}

          <div className="relative w-[420px]">

            <FaSearch className="absolute top-5 left-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search settings..."
              className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl pl-14 pr-5 py-4 outline-none text-lg"
            />
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-8">

            {/* NOTIFICATION */}

            <div className="relative">

              <FaBell className="text-3xl text-blue-600" />

              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                5
              </div>
            </div>

            {/* PROFILE */}

            <div className="flex items-center gap-4">

              <img
                src="/Rutika.jpg.jpeg"
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>

                <h2 className="text-xl font-bold">
                  Rutika Pujari
                </h2>

                <p className="text-gray-500">
                  Inventory Manager
                </p>

              </div>
            </div>
          </div>
        </div>

        {/* PAGE */}

        <div className="p-10">

          {/* HEADER */}

          <div className="flex justify-between items-center mb-10">

            <div>

              <h1 className="text-6xl font-bold text-[#061539]">
                Settings
              </h1>

              <p className="text-gray-500 text-xl mt-3">
                Manage inventory management system preferences and controls.
              </p>

            </div>

            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-5 rounded-2xl text-xl font-semibold flex items-center gap-4 shadow-xl hover:scale-105 transition-all duration-300">

              <FaSave />

              Save Changes
            </button>
          </div>

          {/* GRID */}

          <div className="grid grid-cols-3 gap-8">

            {/* LEFT */}

            <div className="col-span-2 space-y-8">

              {/* ACCOUNT SETTINGS */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <div className="flex items-center gap-5 mb-8">

                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl">

                    <FaUserCog />

                  </div>

                  <div>

                    <h2 className="text-3xl font-bold text-[#061539]">
                      Account Settings
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Manage profile and account details
                    </p>

                  </div>
                </div>

                {/* FORM */}

                <div className="grid grid-cols-2 gap-6">

                  <div>

                    <label className="block font-semibold mb-3 text-lg">
                      Full Name
                    </label>

                    <input
                      type="text"
                      value="Rutika Pujari"
                      className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                    />
                  </div>

                  <div>

                    <label className="block font-semibold mb-3 text-lg">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value="rpujari5000@gmail.com"
                      className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                    />
                  </div>

                  <div>

                    <label className="block font-semibold mb-3 text-lg">
                      Mobile Number
                    </label>

                    <input
                      type="text"
                      value="+91 9876543210"
                      className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                    />
                  </div>

                  <div>

                    <label className="block font-semibold mb-3 text-lg">
                      Role
                    </label>

                    <input
                      type="text"
                      value="Inventory Admin"
                      className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECURITY SETTINGS */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <div className="flex items-center gap-5 mb-8">

                  <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-3xl">

                    <FaLock />

                  </div>

                  <div>

                    <h2 className="text-3xl font-bold text-[#061539]">
                      Security Settings
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Protect your inventory management account
                    </p>

                  </div>
                </div>

                <div className="space-y-5">

                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                  />

                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                  />

                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                  />

                </div>
              </div>

              {/* INVENTORY SETTINGS */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <div className="flex items-center gap-5 mb-8">

                  <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-3xl">

                    <FaWarehouse />

                  </div>

                  <div>

                    <h2 className="text-3xl font-bold text-[#061539]">
                      Inventory Controls
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Configure inventory tracking and monitoring
                    </p>

                  </div>
                </div>

                <div className="space-y-6">

                  {/* LOW STOCK */}

                  <div className="bg-[#f4f7fe] rounded-2xl p-5 flex justify-between items-center">

                    <div className="flex items-center gap-4">

                      <FaBoxOpen className="text-2xl text-blue-600" />

                      <div>

                        <h3 className="font-bold text-lg">
                          Low Stock Alerts
                        </h3>

                        <p className="text-gray-500">
                          Notify when stock becomes low
                        </p>

                      </div>
                    </div>

                    <FaToggleOn className="text-5xl text-blue-600" />
                  </div>

                  {/* REPORTS */}

                  <div className="bg-[#f4f7fe] rounded-2xl p-5 flex justify-between items-center">

                    <div className="flex items-center gap-4">

                      <FaChartBar className="text-2xl text-green-600" />

                      <div>

                        <h3 className="font-bold text-lg">
                          Auto Reports
                        </h3>

                        <p className="text-gray-500">
                          Generate weekly inventory reports
                        </p>

                      </div>
                    </div>

                    <FaToggleOn className="text-5xl text-green-600" />
                  </div>

                  {/* BACKUP */}

                  <div className="bg-[#f4f7fe] rounded-2xl p-5 flex justify-between items-center">

                    <div className="flex items-center gap-4">

                      <FaDatabase className="text-2xl text-purple-600" />

                      <div>

                        <h3 className="font-bold text-lg">
                          Cloud Backup
                        </h3>

                        <p className="text-gray-500">
                          Backup inventory data automatically
                        </p>

                      </div>
                    </div>

                    <FaToggleOff className="text-5xl text-gray-400" />
                  </div>
                </div>
              </div>

              {/* APPEARANCE */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <div className="flex items-center gap-5 mb-8">

                  <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-3xl">

                    <FaPalette />

                  </div>

                  <div>

                    <h2 className="text-3xl font-bold text-[#061539]">
                      Appearance & Preferences
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Customize dashboard look and feel
                    </p>

                  </div>
                </div>

                <div className="space-y-6">

                  {/* DARK MODE */}

                  <div className="bg-[#f4f7fe] rounded-2xl p-5 flex justify-between items-center">

                    <div className="flex items-center gap-4">

                      <FaMoon className="text-2xl text-indigo-600" />

                      <div>

                        <h3 className="font-bold text-lg">
                          Dark Mode
                        </h3>

                        <p className="text-gray-500">
                          Enable dark dashboard theme
                        </p>

                      </div>
                    </div>

                    <FaToggleOn className="text-5xl text-indigo-600" />
                  </div>

                  {/* LANGUAGE */}

                  <div className="bg-[#f4f7fe] rounded-2xl p-5 flex justify-between items-center">

                    <div className="flex items-center gap-4">

                      <FaGlobe className="text-2xl text-green-600" />

                      <div>

                        <h3 className="font-bold text-lg">
                          Language
                        </h3>

                        <p className="text-gray-500">
                          Select preferred language
                        </p>

                      </div>
                    </div>

                    <select className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none">

                      <option>English</option>
                      <option>Marathi</option>

                    </select>
                  </div>

                  {/* 2FA */}

                  <div className="bg-[#f4f7fe] rounded-2xl p-5 flex justify-between items-center">

                    <div className="flex items-center gap-4">

                      <FaShieldAlt className="text-2xl text-red-600" />

                      <div>

                        <h3 className="font-bold text-lg">
                          Two Factor Authentication
                        </h3>

                        <p className="text-gray-500">
                          Extra security for admin login
                        </p>

                      </div>
                    </div>

                    <FaToggleOn className="text-5xl text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="space-y-8">

              {/* PROFILE CARD */}

              <div className="bg-white rounded-3xl p-8 shadow-sm text-center">

                <div className="relative w-fit mx-auto">

                  <img
                    src="/Rutika.jpg.jpeg"
                    alt=""
                    className="w-40 h-40 rounded-full object-cover border-4 border-blue-100"
                  />

                  <button className="absolute bottom-2 right-2 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">

                    <FaCamera />

                  </button>
                </div>

                <h2 className="text-3xl font-bold mt-6 text-[#061539]">
                  Rutika Pujari
                </h2>

                <p className="text-gray-500 mt-2">
                  Inventory Management Admin
                </p>

                <div className="mt-8 space-y-4 text-left">

                  <div className="bg-[#f4f7fe] rounded-2xl p-4">

                    <p className="text-gray-500">
                      Department
                    </p>

                    <h3 className="font-semibold mt-1">
                      Inventory & Sales
                    </h3>
                  </div>

                  <div className="bg-[#f4f7fe] rounded-2xl p-4">

                    <p className="text-gray-500">
                      System Access
                    </p>

                    <h3 className="font-semibold mt-1 text-green-600">
                      Full Access
                    </h3>
                  </div>

                  <div className="bg-[#f4f7fe] rounded-2xl p-4">

                    <p className="text-gray-500">
                      Last Login
                    </p>

                    <h3 className="font-semibold mt-1">
                      Today, 09:45 AM
                    </h3>
                  </div>
                </div>
              </div>

              {/* QUICK SETTINGS */}

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">

                <h2 className="text-3xl font-bold">
                  Quick Settings
                </h2>

                <p className="mt-4 text-blue-100 leading-relaxed">
                  Quickly manage inventory reports, stock alerts and security settings.
                </p>

                <div className="mt-8 space-y-4">

                  <button className="w-full bg-white text-blue-700 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300">

                    Generate Reports
                  </button>

                  <button className="w-full bg-white/20 border border-white/20 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300">

                    Backup Inventory
                  </button>

                  <button className="w-full bg-white/20 border border-white/20 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300">

                    Audit Logs
                  </button>
                </div>
              </div>

              {/* SYSTEM STATUS */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <div className="flex items-center gap-4 mb-6">

                  <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl">

                    <FaClipboardCheck />

                  </div>

                  <div>

                    <h2 className="text-2xl font-bold text-[#061539]">
                      System Status
                    </h2>

                    <p className="text-gray-500">
                      Inventory system health
                    </p>

                  </div>
                </div>

                <div className="space-y-5">

                  <div className="flex justify-between items-center">

                    <span className="font-semibold">
                      Database
                    </span>

                    <span className="text-green-600 font-bold">
                      Active
                    </span>
                  </div>

                  <div className="flex justify-between items-center">

                    <span className="font-semibold">
                      Inventory Sync
                    </span>

                    <span className="text-green-600 font-bold">
                      Running
                    </span>
                  </div>

                  <div className="flex justify-between items-center">

                    <span className="font-semibold">
                      Cloud Backup
                    </span>

                    <span className="text-yellow-500 font-bold">
                      Pending
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;