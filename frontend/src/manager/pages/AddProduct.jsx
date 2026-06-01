import Sidebar from "../components/Sidebar";
import AddProductForm from "../components/AddProductForm";
import {
  FaBell,
  FaSearch,
} from "react-icons/fa";

const AddProduct = () => {
  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Sidebar />

      <div className="ml-[280px] w-full">
        <div className="bg-white border-b px-10 py-6 flex justify-between items-center">
          <div className="relative w-[400px]">
            <FaSearch className="absolute top-5 left-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-[#f4f7fe] border rounded-2xl pl-14 py-4 outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <FaBell className="text-3xl text-blue-600" />
            <img
              src="/Rutika.jpg.jpeg"
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />
          </div>
        </div>

        <div className="p-10">
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-[#061539]">
              Add New Product
            </h1>
            <p className="text-gray-500 mt-3 text-lg">
              Add products to inventory and manage stock efficiently.
            </p>
          </div>

          <AddProductForm />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
