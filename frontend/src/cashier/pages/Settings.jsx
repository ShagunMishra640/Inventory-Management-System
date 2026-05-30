function Settings() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-5">Settings</h1>

      <div className="space-y-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Change Password
        </button>

        <button className="bg-red-500 text-white px-4 py-2 rounded ml-3">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Settings;
