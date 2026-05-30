import Sidebar from "../cashier/components/Sidebar";
import Navbar from "../cashier/components/Navbar";
import { Outlet } from "react-router-dom";

function CashierLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />

        {/* Pages will load here */}
        <Outlet />
      </div>
    </div>
  );
}

export default CashierLayout;
