import {
  FaMoneyBillWave,
  FaReceipt,
  FaBoxOpen,
  FaShoppingCart,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* CARD 1 */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">
              Total Sales
            </p>
            <h1 className="text-2xl font-bold text-pink-600 mt-1">₹12,500</h1>
          </div>
          <FaMoneyBillWave size={32} className="text-pink-500" />
        </div>
      </div>

      {/* CARD 2 */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">
              New Orders
            </p>
            <h1 className="text-2xl font-bold text-purple-600 mt-1">120</h1>
          </div>
          <FaReceipt size={32} className="text-purple-500" />
        </div>
      </div>

      {/* CARD 3 */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">
              Units Sold
            </p>
            <h1 className="text-2xl font-bold text-green-600 mt-1">340</h1>
          </div>
          <FaBoxOpen size={32} className="text-green-500" />
        </div>
      </div>

      {/* CARD 4 */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">
              Customers
            </p>
            <h1 className="text-2xl font-bold text-orange-500 mt-1">85</h1>
          </div>
          <FaShoppingCart size={32} className="text-orange-400" />
        </div>
      </div>
    </div>
  );
}

function OrdersProductsBar() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: [120, 150, 180, 140, 200, 170],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderRadius: 8,
      },
      {
        label: "Products Sold",
        data: [340, 420, 390, 450, 500, 480],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Cashier Orders vs Products Sold",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <Bar data={data} options={options} />
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="p-6">
      <DashboardCards />
      <OrdersProductsBar />
    </div>
  );
}
