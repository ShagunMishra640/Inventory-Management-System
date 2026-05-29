import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import BillSummary from "../components/BillSummary";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navbar */}
        <Navbar />

        {/* Cards */}
        <DashboardCards />

        {/* Bill Summary */}
        <div className="mt-8">
          <BillSummary />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
