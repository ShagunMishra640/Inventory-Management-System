function BillSummary({ cart = [], openPaymentModal }) {
  // Total Price
  const total = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0,
  );

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-5">Bill Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Total Items</span>
          <span>{cart.length}</span>
        </div>

        <div className="flex justify-between">
          <span>Total Price</span>
          <span>₹ {total}</span>
        </div>
      </div>

      <button
        onClick={openPaymentModal}
        className="bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded-lg mt-5"
      >
        Checkout
      </button>
    </div>
  );
}

export default BillSummary;
