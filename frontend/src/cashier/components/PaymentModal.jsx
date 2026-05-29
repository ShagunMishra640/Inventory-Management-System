function PaymentModal({ closeModal, total }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-5">Payment</h2>

        <p className="text-lg mb-5">Total Amount: ₹ {total}</p>

        <div className="space-y-4">
          <button className="bg-green-500 text-white w-full py-3 rounded-lg">
            Cash Payment
          </button>

          <button className="bg-blue-500 text-white w-full py-3 rounded-lg">
            UPI Payment
          </button>

          <button className="bg-purple-500 text-white w-full py-3 rounded-lg">
            Card Payment
          </button>
        </div>

        <button onClick={closeModal} className="mt-5 text-red-500">
          Close
        </button>
      </div>
    </div>
  );
}

export default PaymentModal;
