import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const ManagerPageShell = ({ title, description, children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <div className="ml-[280px] flex-1 p-6">
        <Navbar title={title} />

        <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          {description && <p className="mt-2 text-gray-600">{description}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default ManagerPageShell;
