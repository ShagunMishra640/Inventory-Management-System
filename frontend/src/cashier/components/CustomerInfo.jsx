function CustomerInfo() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-5">Customer Information</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Customer Name"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border p-3 rounded-lg"
        />
      </div>
    </div>
  );
}

export default CustomerInfo;
