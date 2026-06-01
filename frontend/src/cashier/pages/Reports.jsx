import { useState } from "react";

function Reports() {
  const [message, setMessage] = useState("");

  const reportCards = [
    { label: "Daily Sales", value: "₹24,500" },
    { label: "Weekly Sales", value: "₹128,700" },
    { label: "Monthly Sales", value: "₹490,000" },
    { label: "Customer Reports", value: "350 customers" },
    { label: "Product Reports", value: "120 products" },
    { label: "Payment Reports", value: "420 payments" },
  ];

  const downloadFile = (filename, content, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleExport = (format) => {
    const content = ["Report,Value", ...reportCards.map((item) => `${item.label},${item.value}`)].join("\n");

    if (format === "CSV") {
      downloadFile("cashier-reports.csv", content, "text/csv");
      setMessage("CSV exported successfully.");
    } else if (format === "Excel") {
      downloadFile("cashier-reports.xls", content, "application/vnd.ms-excel");
      setMessage("Excel file exported successfully.");
    } else {
      downloadFile("cashier-reports.pdf", content, "application/pdf");
      setMessage("PDF export generated successfully.");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-gray-500">
          Generate sales and customer reports, then export them.
        </p>
      </div>

      {message ? (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          {message}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reportCards.map((item) => (
          <div key={item.label} className="bg-white rounded-3xl shadow p-6">
            <h2 className="font-semibold">{item.label}</h2>
            <p className="mt-3 text-xl font-bold">{item.value}</p>
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
            type="button"
            onClick={() => handleExport(item.label)}
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
