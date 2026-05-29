import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Payments() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />

        <h1 className="text-3xl font-bold mt-6">Payments Page</h1>
      </div>
    </div>
  );
}

export default Payments;
