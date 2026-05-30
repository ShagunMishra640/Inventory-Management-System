function Reports() {
  const reportCards = [
    "Daily Sales",
    "Weekly Sales",
    "Monthly Sales",
    "Customer Reports",
    "Product Reports",
    "Payment Reports",
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-gray-500">
          Generate sales and customer reports, then export them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reportCards.map((item) => (
          <div key={item} className="bg-white rounded-3xl shadow p-6">
            <h2 className="font-semibold">{item}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow p-6 flex flex-wrap gap-3">
        {[
          { label: "PDF", color: "bg-slate-900 text-white" },
          { label: "Excel", color: "bg-emerald-600 text-white" },
          { label: "CSV", color: "bg-blue-600 text-white" },
        ].map((item) => (
          <button
            key={item.label}
            className={`${item.color} rounded-2xl px-5 py-3`}
          >
            Export {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Reports;
