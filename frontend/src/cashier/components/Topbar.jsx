function Topbar() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-700">Welcome Cashier 👋</h2>

        <p className="text-gray-500 mt-1">
          Manage billing and customer sales easily.
        </p>
      </div>

      <div className="h-12 w-12 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
        C
      </div>
    </div>
  );
}

export default Topbar;
