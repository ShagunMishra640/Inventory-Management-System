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
  FaUserCog,
  FaToggleOn,
  FaToggleOff,
  FaShieldAlt,
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

const LANGUAGE_STORAGE_KEY = "managerSettingsLanguage";

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
        setSettings((current) => ({
          ...current,
          ...data,
          language: initialSettings.language,
        }));
      } catch {
        setError("Settings backend is not reachable. Default settings are shown.");
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "language"
        ? initialSettings.language
        : name === "lowStockLimit"
          ? Number(value)
          : value;

    if (name === "language") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, initialSettings.language);
    }

    setSettings((current) => ({
      ...current,
      [name]: nextValue,
    }));
  };

  const toggleSetting = async (name) => {
    const nextSettings = {
      ...settings,
      [name]: !settings[name],
      language: initialSettings.language,
    };
    const previousSettings = settings;

    setSettings(nextSettings);
    setMessage("");
    setError("");

    try {
      setIsSaving(true);
      const savedSettings = await updateSettings(nextSettings);
      setSettings((current) => ({
        ...current,
        ...savedSettings,
        language: initialSettings.language,
      }));
      setMessage(`${translations.English[name] || "Setting"} updated successfully`);
    } catch {
      setSettings(previousSettings);
      setError("Setting could not be saved. Please keep the backend server running.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError("");
      setMessage("");
      const settingsPayload = {
        ...settings,
        language: initialSettings.language,
      };
      const savedSettings = await updateSettings(settingsPayload);
      setSettings((current) => ({
        ...current,
        ...savedSettings,
        language: settingsPayload.language,
      }));
      localStorage.setItem(LANGUAGE_STORAGE_KEY, settingsPayload.language);
      setMessage((translations[settingsPayload.language] || translations.English).saved);
    } catch {
      setError("Settings could not be saved. Please keep the backend server running.");
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
  const text = translations.English;
  const isDarkMode = Boolean(settings.darkMode);

  return (
    <div
      className={`manager-settings-page flex min-h-screen overflow-x-hidden ${
        isDarkMode ? "dark bg-slate-950" : "bg-[#f4f7fe]"
      }`}
    >
      <style>{`
        .manager-settings-page.dark {
          color: #e5e7eb;
        }

        .manager-settings-page.dark .settings-main {
          background: #0f172a;
        }

        .manager-settings-page.dark .settings-surface,
        .manager-settings-page.dark .bg-white,
        .manager-settings-page.dark [class*="bg-[#f4f7fe]"] {
          background: #111827 !important;
          border-color: #243044 !important;
          box-shadow: none !important;
        }

        .manager-settings-page.dark [class*="text-[#061539]"],
        .manager-settings-page.dark h1,
        .manager-settings-page.dark h2,
        .manager-settings-page.dark h3,
        .manager-settings-page.dark label,
        .manager-settings-page.dark .font-semibold {
          color: #f8fafc !important;
        }

        .manager-settings-page.dark p,
        .manager-settings-page.dark .text-gray-500 {
          color: #94a3b8 !important;
        }

        .manager-settings-page.dark input,
        .manager-settings-page.dark select {
          background: #0f172a !important;
          color: #f8fafc !important;
          border-color: #334155 !important;
        }

        .manager-settings-page.dark input::placeholder {
          color: #64748b !important;
        }
      `}</style>

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div
        className="settings-main ml-[280px] min-h-screen overflow-x-hidden"
        style={{ width: "calc(100vw - 280px)" }}
      >

        {/* TOPBAR */}

        <div className="settings-surface bg-white border-b px-8 py-5 flex justify-between items-center">

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

        <div className="p-6">

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

          <div className="space-y-6">

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
                      disabled={isSaving}
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
                      disabled={isSaving}
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
                      disabled={isSaving}
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
                      disabled={isSaving}
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
                      disabled={isSaving}
                      aria-label="Toggle two factor authentication"
                    >
                      <ToggleIcon enabled={settings.twoFactorAuth} />
                    </button>
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
