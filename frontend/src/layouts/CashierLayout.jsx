import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

function CashierLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <Topbar />

        {/* Pages will load here */}
        <Outlet />
      </div>
    </div>
  );
}

export default CashierLayout;
