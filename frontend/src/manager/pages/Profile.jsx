import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getProfile, getProfileActivities, updateProfile } from "../services/profileService";
import exportReport from "../utils/exportReport";

import {
  FaBell,
  FaSearch,
  FaEdit,
  FaCamera,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserTie,
  FaBoxes,
  FaClipboardList,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaDownload,
} from "react-icons/fa";

const fallbackActivities = [
  {
    title: "Reviewed Stock Levels",
    time: "2 hours ago",
    iconType: "boxes",
    color: "bg-blue-100 text-blue-600",
    description: "Latest stock quantities reviewed for inventory accuracy.",
    module: "Inventory",
    status: "Completed",
  },

  {
    title: "Approved Purchase Order",
    time: "5 hours ago",
    iconType: "clipboard",
    color: "bg-green-100 text-green-600",
    description: "Recent purchase order checked and prepared for supplier follow-up.",
    module: "Purchase Orders",
    status: "Pending",
  },

  {
    title: "Generated Inventory Report",
    time: "1 day ago",
    iconType: "chart",
    color: "bg-purple-100 text-purple-600",
    description: "Inventory summary report generated from backend stock records.",
    module: "Reports",
    status: "Generated",
  },

  {
    title: "Checked Low Stock Alerts",
    time: "2 days ago",
    iconType: "check",
    color: "bg-orange-100 text-orange-600",
    description: "Low stock products reviewed against minimum stock limits.",
    module: "Low Stock",
    status: "Healthy",
  },
];

const activityIcons = {
  boxes: <FaBoxes />,
  clipboard: <FaClipboardList />,
  chart: <FaChartLine />,
  check: <FaCheckCircle />,
};

const activityColors = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
};

const fallbackProfile = {
  name: "Rutika Pujari",
  email: "rpujari5000@gmail.com",
  phone: "+91 9876543210",
  location: "Solapur, Maharashtra",
  title: "Inventory Manager",
  role: "inventory-manager",
  bio: "Inventory manager focused on stock accuracy, purchase planning, supplier coordination, low-stock control and smooth order fulfillment. Experienced in monitoring inventory movement, maintaining warehouse discipline and preparing clear inventory reports for daily operations.",
  skills: ["Stock Control", "Purchase Planning", "Supplier Coordination", "Inventory Reporting"],
  avatar: "/Rutika.jpg.jpeg",
};

const roleLabel = {
  admin: "Admin",
  cashier: "Manager",
  "inventory-manager": "Inventory Manager",
};

const makeManagerProfile = (user = {}) => {
  const role = user.role === "cashier" ? "inventory-manager" : user.role || fallbackProfile.role;
  const userTitle = String(user.title || "").trim();

  return {
    ...fallbackProfile,
    ...user,
    role,
    title: userTitle && userTitle.toLowerCase() !== "cashier" ? userTitle : roleLabel[role] || fallbackProfile.title,
    skills: user.skills?.length ? user.skills : fallbackProfile.skills,
    avatar: user.avatar || fallbackProfile.avatar,
  };
};

const Profile = () => {
  const [profile, setProfile] = useState(fallbackProfile);
  const [formData, setFormData] = useState(fallbackProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activities, setActivities] = useState(fallbackActivities);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError("");
        const user = await getProfile();
        const mergedProfile = makeManagerProfile(user);
        setProfile(mergedProfile);
        setFormData(mergedProfile);
        localStorage.setItem("user", JSON.stringify(user));
      } catch {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        const mergedProfile = makeManagerProfile(storedUser || fallbackProfile);
        setProfile(mergedProfile);
        setFormData(mergedProfile);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const backendActivities = await getProfileActivities();
        setActivities(backendActivities.length ? backendActivities : fallbackActivities);
      } catch {
        setActivities(fallbackActivities);
      }
    };

    loadActivities();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: name === "skills" ? value.split(",").map((skill) => skill.trim()).filter(Boolean) : value,
    }));
  };

  const openEditModal = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    if (isSaving) return;
    setIsEditing(false);
  };

  const handleViewActivity = (activity) => {
    setError("");
    setMessage(`${activity.title}: ${activity.description || activity.module || "Activity details loaded."}`);
  };

  const handleExportActivities = () => {
    exportReport(
      activities.map((activity) => ({
        title: activity.title,
        module: activity.module,
        status: activity.status,
        time: activity.time,
        description: activity.description,
      })),
      "manager-profile-activities.csv"
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");
      setMessage("");
      const updatedUser = await updateProfile(formData);
      const updatedProfile = makeManagerProfile({ ...profile, ...updatedUser });
      setProfile(updatedProfile);
      setFormData(updatedProfile);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMessage("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Profile update failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="ml-[280px] w-full">

        {/* TOPBAR */}

        <div className="bg-white px-10 py-6 border-b flex justify-between items-center">

          {/* SEARCH */}

          <div className="relative w-[420px]">

            <FaSearch className="absolute top-5 left-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search profile..."
              className="w-full bg-[#f4f7fe] rounded-2xl pl-14 pr-5 py-4 border border-gray-200 outline-none text-lg"
            />
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-8">

            {/* NOTIFICATION */}

            <div className="relative">

              <FaBell className="text-3xl text-blue-600" />

              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                6
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

                <h2 className="font-bold text-xl">
                  {profile.name}
                </h2>

                <p className="text-gray-500">
                  {profile.title || roleLabel[profile.role] || "Inventory Manager"}
                </p>

              </div>
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}

        <div className="p-10">

          {/* HEADER */}

          <div className="flex justify-between items-center mb-10">

            <div>

              <h1 className="text-6xl font-bold text-[#061539]">
                Profile Overview
              </h1>

              <p className="text-gray-500 text-xl mt-3">
                Manage your inventory management profile and business details.
              </p>

            </div>

            <button
              type="button"
              onClick={openEditModal}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-5 rounded-2xl text-xl font-semibold flex items-center gap-4 shadow-xl hover:scale-105 transition-all duration-300"
            >

              <FaEdit />

              Edit Profile
            </button>
          </div>

          {isLoading && (
            <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-4 text-blue-700">
              Profile loading...
            </div>
          )}

          {message && (
            <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-6 py-4 text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-700">
              {error}
            </div>
          )}

          {/* GRID */}

          <div className="space-y-8">

            {/* LEFT SIDE */}

            <div className="space-y-8">

              {/* PROFILE CARD */}

              <div className="bg-white rounded-3xl p-8 shadow-sm text-center">

                <div className="relative w-fit mx-auto">

                  <img
                    src={profile.avatar || "/Rutika.jpg.jpeg"}
                    alt={profile.name}
                    className="w-44 h-44 rounded-full object-cover border-4 border-blue-100"
                  />

                  <button className="absolute bottom-2 right-2 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">

                    <FaCamera />

                  </button>
                </div>

                <h2 className="text-4xl font-bold mt-6 text-[#061539]">
                  {profile.name}
                </h2>

                <p className="text-blue-600 text-xl font-semibold mt-2">
                  {profile.title || roleLabel[profile.role] || "Manager"}
                </p>

                <div className="flex justify-center gap-4 mt-6">

                  {profile.skills.slice(0, 2).map((skill, index) => (
                    <span
                      key={skill}
                      className={`px-5 py-2 rounded-xl font-semibold ${
                        index === 0
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}

                </div>

                {/* CONTACT */}

                <div className="mt-10 space-y-5 text-left">

                  <div className="flex items-center gap-4 bg-[#f4f7fe] p-5 rounded-2xl">

                    <FaEnvelope className="text-blue-600 text-2xl" />

                    <div>

                      <p className="text-gray-500">
                        Email
                      </p>

                      <h3 className="font-semibold">
                        {profile.email}
                      </h3>

                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-[#f4f7fe] p-5 rounded-2xl">

                    <FaPhoneAlt className="text-green-600 text-2xl" />

                    <div>

                      <p className="text-gray-500">
                        Phone
                      </p>

                      <h3 className="font-semibold">
                        {profile.phone || "-"}
                      </h3>

                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-[#f4f7fe] p-5 rounded-2xl">

                    <FaMapMarkerAlt className="text-red-600 text-2xl" />

                    <div>

                      <p className="text-gray-500">
                        Location
                      </p>

                      <h3 className="font-semibold">
                        {profile.location || "-"}
                      </h3>

                    </div>
                  </div>
                </div>
              </div>

              {/* QUICK STATS */}

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">

                <h2 className="text-3xl font-bold">
                  Performance
                </h2>

                <div className="mt-8 space-y-6">

                  <div className="flex justify-between items-center">

                    <span className="text-lg">
                      Inventory Accuracy
                    </span>

                    <span className="font-bold text-2xl">
                      98%
                    </span>
                  </div>

                  <div className="w-full h-3 bg-white/20 rounded-full">

                    <div className="w-[98%] h-3 bg-white rounded-full" />

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="text-lg">
                      Order Processing
                    </span>

                    <span className="font-bold text-2xl">
                      95%
                    </span>
                  </div>

                  <div className="w-full h-3 bg-white/20 rounded-full">

                    <div className="w-[95%] h-3 bg-white rounded-full" />

                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="space-y-8">

              {/* ABOUT */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-3xl font-bold text-[#061539]">
                      About Manager
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Professional inventory management overview
                    </p>

                  </div>

                  <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-4xl">

                    <FaUserTie />

                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mt-8">
                  {profile.bio}
                </p>
              </div>

              {/* STATS */}

              <div className="grid grid-cols-4 gap-6">

                <div className="bg-white rounded-3xl p-8 shadow-sm">

                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-3xl mb-5">

                    <FaBoxes />

                  </div>

                  <h1 className="text-5xl font-bold">
                    1.2K
                  </h1>

                  <p className="text-gray-500 mt-3 text-lg">
                    Stock Items
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm">

                  <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-3xl mb-5">

                    <FaClipboardList />

                  </div>

                  <h1 className="text-5xl font-bold">
                    850
                  </h1>

                  <p className="text-gray-500 mt-3 text-lg">
                    Orders Managed
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm">

                  <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-3xl mb-5">

                    <FaChartLine />

                  </div>

                  <h1 className="text-5xl font-bold">
                    98%
                  </h1>

                  <p className="text-gray-500 mt-3 text-lg">
                    Stock Accuracy
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm">

                  <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-3xl mb-5">

                    <FaStar />

                  </div>

                  <h1 className="text-5xl font-bold">
                    24
                  </h1>

                  <p className="text-gray-500 mt-3 text-lg">
                    Suppliers
                  </p>
                </div>
              </div>

              {/* RECENT ACTIVITY */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <div className="flex justify-between items-center mb-8">

                  <div>

                    <h2 className="text-3xl font-bold text-[#061539]">
                      Recent Activities
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Latest inventory management activities
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={handleExportActivities}
                    className="bg-blue-100 text-blue-700 px-5 py-3 rounded-xl font-semibold flex items-center gap-3"
                  >

                    <FaDownload />

                    Export
                  </button>
                </div>

                <div className="space-y-6">

                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-[#f4f7fe] p-6 rounded-2xl hover:shadow-md transition-all duration-300"
                    >

                      <div className="flex items-center gap-5">

                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                            activity.color?.startsWith("bg-")
                              ? activity.color
                              : activityColors[activity.color] || "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {activityIcons[activity.iconType] || <FaBoxes />}
                        </div>

                        <div>

                          <h3 className="text-xl font-bold text-[#061539]">
                            {activity.title}
                          </h3>

                          <div className="flex items-center gap-2 mt-2 text-gray-500">

                            <FaClock />

                            <span>
                              {activity.time}
                            </span>

                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleViewActivity(activity)}
                        className="bg-white border border-gray-200 px-5 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                      >

                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* EXPERIENCE */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <h2 className="text-3xl font-bold text-[#061539] mb-8">
                  Experience & Skills
                </h2>

                <div className="grid grid-cols-2 gap-8">

                  {/* EXPERIENCE */}

                  <div className="bg-[#f4f7fe] rounded-3xl p-6">

                    <h3 className="text-2xl font-bold mb-6">
                      Experience
                    </h3>

                    <div className="space-y-6">

                      <div className="border-l-4 border-blue-600 pl-5">

                        <h4 className="font-bold text-xl">
                          Inventory Manager
                        </h4>

                        <p className="text-blue-600 mt-1">
                          Stock operations, order tracking and supplier coordination
                        </p>

                      </div>

                      <div className="border-l-4 border-purple-600 pl-5">

                        <h4 className="font-bold text-xl">
                          Inventory Coordinator
                        </h4>

                        <p className="text-purple-600 mt-1">
                          Purchase planning, warehouse records and daily reporting
                        </p>

                      </div>
                    </div>
                  </div>

                  {/* SKILLS */}

                  <div className="bg-[#f4f7fe] rounded-3xl p-6">

                    <h3 className="text-2xl font-bold mb-6">
                      Skills
                    </h3>

                    <div className="space-y-5">

                      {(profile.skills.length
                        ? profile.skills
                        : ["Stock Control", "Purchase Planning", "Supplier Coordination", "Inventory Reporting"]
                      ).map((skill, index) => (
                        <div key={index}>

                          <div className="flex justify-between mb-2">

                            <span className="font-semibold">
                              {skill}
                            </span>

                            <span className="font-bold">
                              {95 - index * 5}%
                            </span>

                          </div>

                          <div className="w-full h-3 bg-gray-200 rounded-full">

                            <div
                              className={`h-3 rounded-full ${
                                index === 0
                                  ? "w-[95%] bg-blue-600"
                                  : index === 1
                                  ? "w-[90%] bg-purple-600"
                                  : index === 2
                                  ? "w-[85%] bg-green-600"
                                  : "w-[80%] bg-orange-500"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
            <div className="border-b px-6 py-5">
              <h2 className="text-2xl font-bold text-[#061539]">
                Edit Profile
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5 p-6">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Phone
                </label>
                <input
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Location
                </label>
                <input
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Title
                </label>
                <input
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Skills
                </label>
                <input
                  name="skills"
                  value={(formData.skills || []).join(", ")}
                  onChange={handleChange}
                  placeholder="React JS, Tailwind CSS"
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="mb-2 block font-semibold text-gray-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio || ""}
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                />
              </div>

              <div className="col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
