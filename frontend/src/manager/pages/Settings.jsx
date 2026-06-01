import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getSettings, updateSettings } from "../services/settingsService";

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

const initialSettings = {
  companyName: "My Inventory Store",
  companyEmail: "admin@gmail.com",
  mobileNumber: "+91 9876543210",
  role: "Inventory Admin",
  currency: "INR",
  language: "English",
  lowStockLimit: 10,
  lowStockAlerts: true,
  autoReports: true,
  cloudBackup: false,
  darkMode: true,
  twoFactorAuth: true,
};

const translations = {
  English: {
    search: "Search settings...",
    title: "Settings",
    subtitle: "Manage inventory management system preferences and controls.",
    save: "Save Changes",
    saving: "Saving...",
    loading: "Settings loading...",
    saved: "Settings saved successfully",
    loadError: "Settings load failed",
    saveError: "Settings save failed",
    accountTitle: "Account Settings",
    accountSubtitle: "Manage profile and account details",
    fullName: "Full Name",
    email: "Email Address",
    mobile: "Mobile Number",
    role: "Role",
    securityTitle: "Security Settings",
    securitySubtitle: "Protect your inventory management account",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    inventoryTitle: "Inventory Controls",
    inventorySubtitle: "Configure inventory tracking and monitoring",
    lowStockAlerts: "Low Stock Alerts",
    lowStockAlertsDesc: "Notify when stock becomes low",
    lowStockLimit: "Low Stock Limit",
    autoReports: "Auto Reports",
    autoReportsDesc: "Generate weekly inventory reports",
    cloudBackup: "Cloud Backup",
    cloudBackupDesc: "Backup inventory data automatically",
    appearanceTitle: "Appearance & Preferences",
    appearanceSubtitle: "Customize dashboard look and feel",
    darkMode: "Dark Mode",
    darkModeDesc: "Enable dark dashboard theme",
    language: "Language",
    languageDesc: "Select preferred language",
    twoFactor: "Two Factor Authentication",
    twoFactorDesc: "Extra security for admin login",
    profileRole: "Inventory Management Admin",
    department: "Department",
    departmentValue: "Inventory & Sales",
    systemAccess: "System Access",
    fullAccess: "Full Access",
    lastLogin: "Last Login",
    todayLogin: "Today, 09:45 AM",
    quickSettings: "Quick Settings",
    quickDesc: "Quickly manage inventory reports, stock alerts and security settings.",
    generateReports: "Generate Reports",
    backupInventory: "Backup Inventory",
    auditLogs: "Audit Logs",
    systemStatus: "System Status",
    systemStatusDesc: "Inventory system health",
    database: "Database",
    active: "Active",
    inventorySync: "Inventory Sync",
    running: "Running",
    pending: "Pending",
  },
  Marathi: {
    search: "सेटिंग्ज शोधा...",
    title: "सेटिंग्ज",
    subtitle: "इन्व्हेंटरी व्यवस्थापन प्रणालीची प्राधान्ये आणि नियंत्रण व्यवस्थापित करा.",
    save: "बदल सेव्ह करा",
    saving: "सेव्ह होत आहे...",
    loading: "सेटिंग्ज लोड होत आहेत...",
    saved: "सेटिंग्ज यशस्वीरित्या सेव्ह झाल्या",
    loadError: "सेटिंग्ज लोड झाल्या नाहीत",
    saveError: "सेटिंग्ज सेव्ह झाल्या नाहीत",
    accountTitle: "खाते सेटिंग्ज",
    accountSubtitle: "प्रोफाइल आणि खाते माहिती व्यवस्थापित करा",
    fullName: "पूर्ण नाव",
    email: "ईमेल पत्ता",
    mobile: "मोबाइल नंबर",
    role: "भूमिका",
    securityTitle: "सुरक्षा सेटिंग्ज",
    securitySubtitle: "तुमचे इन्व्हेंटरी व्यवस्थापन खाते सुरक्षित ठेवा",
    currentPassword: "सध्याचा पासवर्ड",
    newPassword: "नवीन पासवर्ड",
    confirmPassword: "पासवर्ड पुष्टी करा",
    inventoryTitle: "इन्व्हेंटरी नियंत्रण",
    inventorySubtitle: "इन्व्हेंटरी ट्रॅकिंग आणि मॉनिटरिंग सेट करा",
    lowStockAlerts: "कमी स्टॉक सूचना",
    lowStockAlertsDesc: "स्टॉक कमी झाल्यावर सूचना द्या",
    lowStockLimit: "कमी स्टॉक मर्यादा",
    autoReports: "ऑटो रिपोर्ट्स",
    autoReportsDesc: "साप्ताहिक इन्व्हेंटरी रिपोर्ट तयार करा",
    cloudBackup: "क्लाउड बॅकअप",
    cloudBackupDesc: "इन्व्हेंटरी डेटा आपोआप बॅकअप करा",
    appearanceTitle: "दिसणे आणि प्राधान्ये",
    appearanceSubtitle: "डॅशबोर्डचा लुक आणि फील बदला",
    darkMode: "डार्क मोड",
    darkModeDesc: "डार्क डॅशबोर्ड थीम सुरू करा",
    language: "भाषा",
    languageDesc: "पसंतीची भाषा निवडा",
    twoFactor: "दोन-घटक प्रमाणीकरण",
    twoFactorDesc: "अॅडमिन लॉगिनसाठी अतिरिक्त सुरक्षा",
    profileRole: "इन्व्हेंटरी व्यवस्थापन अॅडमिन",
    department: "विभाग",
    departmentValue: "इन्व्हेंटरी आणि विक्री",
    systemAccess: "सिस्टम प्रवेश",
    fullAccess: "पूर्ण प्रवेश",
    lastLogin: "शेवटचा लॉगिन",
    todayLogin: "आज, 09:45 AM",
    quickSettings: "जलद सेटिंग्ज",
    quickDesc: "इन्व्हेंटरी रिपोर्ट्स, स्टॉक सूचना आणि सुरक्षा सेटिंग्ज जलद व्यवस्थापित करा.",
    generateReports: "रिपोर्ट तयार करा",
    backupInventory: "इन्व्हेंटरी बॅकअप",
    auditLogs: "ऑडिट लॉग्स",
    systemStatus: "सिस्टम स्थिती",
    systemStatusDesc: "इन्व्हेंटरी सिस्टम आरोग्य",
    database: "डेटाबेस",
    active: "सक्रिय",
    inventorySync: "इन्व्हेंटरी सिंक",
    running: "चालू आहे",
    pending: "प्रलंबित",
  },
};

const Settings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await getSettings();
        setSettings((current) => ({ ...current, ...data }));
      } catch (err) {
        setError(err?.response?.data?.message || err.message || translations.English.loadError);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSettings((current) => ({
      ...current,
      [name]: name === "lowStockLimit" ? Number(value) : value,
    }));
  };

  const toggleSetting = (name) => {
    setSettings((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError("");
      setMessage("");
      const savedSettings = await updateSettings(settings);
      setSettings((current) => ({ ...current, ...savedSettings }));
      setMessage((translations[savedSettings.language] || translations.English).saved);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || text.saveError);
    } finally {
      setIsSaving(false);
    }
  };

  const ToggleIcon = ({ enabled }) =>
    enabled ? (
      <FaToggleOn className="text-5xl text-blue-600" />
    ) : (
      <FaToggleOff className="text-5xl text-gray-400" />
    );
  const text = translations[settings.language] || translations.English;

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
              placeholder={text.search}
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
                  {settings.role}
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
                {text.title}
              </h1>

              <p className="text-gray-500 text-xl mt-3">
                {text.subtitle}
              </p>

            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-5 rounded-2xl text-xl font-semibold flex items-center gap-4 shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-60"
            >

              <FaSave />

              {isSaving ? text.saving : text.save}
            </button>
          </div>

          {isLoading && (
            <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-4 text-blue-700">
              {text.loading}
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
                      {text.accountTitle}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {text.accountSubtitle}
                    </p>

                  </div>
                </div>

                {/* FORM */}

                <div className="grid grid-cols-2 gap-6">

                  <div>

                    <label className="block font-semibold mb-3 text-lg">
                      {text.fullName}
                    </label>

                    <input
                      type="text"
                      name="companyName"
                      value={settings.companyName}
                      onChange={handleChange}
                      className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                    />
                  </div>

                  <div>

                    <label className="block font-semibold mb-3 text-lg">
                      {text.email}
                    </label>

                    <input
                      type="email"
                      name="companyEmail"
                      value={settings.companyEmail}
                      onChange={handleChange}
                      className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                    />
                  </div>

                  <div>

                    <label className="block font-semibold mb-3 text-lg">
                      {text.mobile}
                    </label>

                    <input
                      type="text"
                      name="mobileNumber"
                      value={settings.mobileNumber}
                      onChange={handleChange}
                      className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                    />
                  </div>

                  <div>

                    <label className="block font-semibold mb-3 text-lg">
                      {text.role}
                    </label>

                    <input
                      type="text"
                      name="role"
                      value={settings.role}
                      onChange={handleChange}
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
                      {text.securityTitle}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {text.securitySubtitle}
                    </p>

                  </div>
                </div>

                <div className="space-y-5">

                  <input
                    type="password"
                    placeholder={text.currentPassword}
                    className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                  />

                  <input
                    type="password"
                    placeholder={text.newPassword}
                    className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                  />

                  <input
                    type="password"
                    placeholder={text.confirmPassword}
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
                      {text.inventoryTitle}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {text.inventorySubtitle}
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
                          {text.lowStockAlerts}
                        </h3>

                        <p className="text-gray-500">
                          {text.lowStockAlertsDesc}
                        </p>

                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSetting("lowStockAlerts")}
                      aria-label="Toggle low stock alerts"
                    >
                      <ToggleIcon enabled={settings.lowStockAlerts} />
                    </button>
                  </div>

                  <div>
                    <label className="block font-semibold mb-3 text-lg">
                      {text.lowStockLimit}
                    </label>
                    <input
                      type="number"
                      name="lowStockLimit"
                      min="0"
                      value={settings.lowStockLimit}
                      onChange={handleChange}
                      className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                    />
                  </div>

                  {/* REPORTS */}

                  <div className="bg-[#f4f7fe] rounded-2xl p-5 flex justify-between items-center">

                    <div className="flex items-center gap-4">

                      <FaChartBar className="text-2xl text-green-600" />

                      <div>

                        <h3 className="font-bold text-lg">
                          {text.autoReports}
                        </h3>

                        <p className="text-gray-500">
                          {text.autoReportsDesc}
                        </p>

                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSetting("autoReports")}
                      aria-label="Toggle auto reports"
                    >
                      <ToggleIcon enabled={settings.autoReports} />
                    </button>
                  </div>

                  {/* BACKUP */}

                  <div className="bg-[#f4f7fe] rounded-2xl p-5 flex justify-between items-center">

                    <div className="flex items-center gap-4">

                      <FaDatabase className="text-2xl text-purple-600" />

                      <div>

                        <h3 className="font-bold text-lg">
                          {text.cloudBackup}
                        </h3>

                        <p className="text-gray-500">
                          {text.cloudBackupDesc}
                        </p>

                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSetting("cloudBackup")}
                      aria-label="Toggle cloud backup"
                    >
                      <ToggleIcon enabled={settings.cloudBackup} />
                    </button>
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
                      {text.appearanceTitle}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {text.appearanceSubtitle}
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
                          {text.darkMode}
                        </h3>

                        <p className="text-gray-500">
                          {text.darkModeDesc}
                        </p>

                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSetting("darkMode")}
                      aria-label="Toggle dark mode"
                    >
                      <ToggleIcon enabled={settings.darkMode} />
                    </button>
                  </div>

                  {/* LANGUAGE */}

                  <div className="bg-[#f4f7fe] rounded-2xl p-5 flex justify-between items-center">

                    <div className="flex items-center gap-4">

                      <FaGlobe className="text-2xl text-green-600" />

                      <div>

                        <h3 className="font-bold text-lg">
                          {text.language}
                        </h3>

                        <p className="text-gray-500">
                          {text.languageDesc}
                        </p>

                      </div>
                    </div>

                    <select
                      name="language"
                      value={settings.language}
                      onChange={handleChange}
                      className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none"
                    >

                      <option value="English">English</option>
                      <option value="Marathi">मराठी</option>

                    </select>
                  </div>

                  {/* 2FA */}

                  <div className="bg-[#f4f7fe] rounded-2xl p-5 flex justify-between items-center">

                    <div className="flex items-center gap-4">

                      <FaShieldAlt className="text-2xl text-red-600" />

                      <div>

                        <h3 className="font-bold text-lg">
                          {text.twoFactor}
                        </h3>

                        <p className="text-gray-500">
                          {text.twoFactorDesc}
                        </p>

                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSetting("twoFactorAuth")}
                      aria-label="Toggle two factor authentication"
                    >
                      <ToggleIcon enabled={settings.twoFactorAuth} />
                    </button>
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
                  {text.profileRole}
                </p>

                <div className="mt-8 space-y-4 text-left">

                  <div className="bg-[#f4f7fe] rounded-2xl p-4">

                    <p className="text-gray-500">
                      {text.department}
                    </p>

                    <h3 className="font-semibold mt-1">
                      {text.departmentValue}
                    </h3>
                  </div>

                  <div className="bg-[#f4f7fe] rounded-2xl p-4">

                    <p className="text-gray-500">
                      {text.systemAccess}
                    </p>

                    <h3 className="font-semibold mt-1 text-green-600">
                      {text.fullAccess}
                    </h3>
                  </div>

                  <div className="bg-[#f4f7fe] rounded-2xl p-4">

                    <p className="text-gray-500">
                      {text.lastLogin}
                    </p>

                    <h3 className="font-semibold mt-1">
                      {text.todayLogin}
                    </h3>
                  </div>
                </div>
              </div>

              {/* QUICK SETTINGS */}

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">

                <h2 className="text-3xl font-bold">
                  {text.quickSettings}
                </h2>

                <p className="mt-4 text-blue-100 leading-relaxed">
                  {text.quickDesc}
                </p>

                <div className="mt-8 space-y-4">

                  <button className="w-full bg-white text-blue-700 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300">

                    {text.generateReports}
                  </button>

                  <button className="w-full bg-white/20 border border-white/20 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300">

                    {text.backupInventory}
                  </button>

                  <button className="w-full bg-white/20 border border-white/20 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300">

                    {text.auditLogs}
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
                      {text.systemStatus}
                    </h2>

                    <p className="text-gray-500">
                      {text.systemStatusDesc}
                    </p>

                  </div>
                </div>

                <div className="space-y-5">

                  <div className="flex justify-between items-center">

                    <span className="font-semibold">
                      {text.database}
                    </span>

                    <span className="text-green-600 font-bold">
                      {text.active}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">

                    <span className="font-semibold">
                      {text.inventorySync}
                    </span>

                    <span className="text-green-600 font-bold">
                      {text.running}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">

                    <span className="font-semibold">
                      {text.cloudBackup}
                    </span>

                    <span className="text-yellow-500 font-bold">
                      {text.pending}
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
