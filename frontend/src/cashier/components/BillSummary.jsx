function BillSummary() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-5">Bill Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>

          <span className="font-semibold">₹47,400</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Tax</span>

          <span className="font-semibold">₹2,600</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span className="text-pink-600">₹50,000</span>
        </div>

        <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-bold">
          Generate Bill
        </button>
      </div>
    </div>
  );
}

export default BillSummary;
