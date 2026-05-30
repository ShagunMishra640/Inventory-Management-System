function Payments() {
  const payments = [
    { id: "PAY001", order: "ORD001", amount: 450, method: "UPI" },
    { id: "PAY002", order: "ORD002", amount: 320, method: "Cash" },
  ];

  const summaryCards = [
    { label: "Cash Payments", value: "₹8,250" },
    { label: "UPI Payments", value: "₹12,400" },
    { label: "Card Payments", value: "₹6,700" },
    { label: "Pending Payments", value: "₹1,200" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-gray-500">
          Overview of payment activity and recent transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {summaryCards.map((card) => (
          <div key={card.label} className="bg-white rounded-3xl shadow p-5">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="mt-4 text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Payment ID</th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Method</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b last:border-b-0">
                <td className="p-4">{payment.id}</td>
                <td className="p-4">{payment.order}</td>
                <td className="p-4">₹{payment.amount}</td>
                <td className="p-4">{payment.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payments;
