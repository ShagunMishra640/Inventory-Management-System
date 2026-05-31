import Sidebar from "../components/Sidebar";
import {
  FaBell,
  FaSearch,
  FaUpload,
  FaBoxOpen,
  FaTags,
  FaWarehouse,
  FaRupeeSign,
  FaTruck,
  FaSave,
  FaUndo,
} from "react-icons/fa";

const AddProduct = () => {
  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Sidebar />

      <div className="ml-[280px] w-full">

        {/* TOPBAR */}

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

        {/* PAGE */}

        <div className="p-10">

          {/* HEADER */}

          <div className="mb-10">

            <h1 className="text-5xl font-bold text-[#061539]">
              Add New Product
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Add products to inventory and manage stock efficiently.
            </p>

          </div>

          <div className="grid grid-cols-3 gap-8">

            {/* LEFT SIDE */}

            <div className="col-span-2 space-y-8">

              {/* PRODUCT DETAILS */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <div className="flex items-center gap-4 mb-8">

                  <FaBoxOpen className="text-3xl text-blue-600" />

                  <h2 className="text-3xl font-bold">
                    Product Information
                  </h2>

                </div>

                <div className="grid grid-cols-2 gap-6">

                  <input
                    type="text"
                    placeholder="Product Name"
                    className="bg-[#f4f7fe] p-4 rounded-2xl border outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Product SKU"
                    className="bg-[#f4f7fe] p-4 rounded-2xl border outline-none"
                  />

                  <select className="bg-[#f4f7fe] p-4 rounded-2xl border outline-none">
                    <option>Select Category</option>
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Accessories</option>
                  </select>

                  <select className="bg-[#f4f7fe] p-4 rounded-2xl border outline-none">
                    <option>Select Brand</option>
                    <option>HP</option>
                    <option>Dell</option>
                    <option>Apple</option>
                  </select>

                </div>

                <textarea
                  rows="5"
                  placeholder="Product Description"
                  className="w-full mt-6 bg-[#f4f7fe] p-4 rounded-2xl border outline-none"
                />
              </div>

              {/* STOCK */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <div className="flex items-center gap-4 mb-8">

                  <FaWarehouse className="text-3xl text-green-600" />

                  <h2 className="text-3xl font-bold">
                    Inventory Details
                  </h2>

                </div>

                <div className="grid grid-cols-3 gap-6">

                  <input
                    type="number"
                    placeholder="Quantity"
                    className="bg-[#f4f7fe] p-4 rounded-2xl border outline-none"
                  />

                  <input
                    type="number"
                    placeholder="Minimum Stock"
                    className="bg-[#f4f7fe] p-4 rounded-2xl border outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Warehouse"
                    className="bg-[#f4f7fe] p-4 rounded-2xl border outline-none"
                  />

                </div>
              </div>

              {/* PRICE */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <div className="flex items-center gap-4 mb-8">

                  <FaRupeeSign className="text-3xl text-purple-600" />

                  <h2 className="text-3xl font-bold">
                    Pricing Details
                  </h2>

                </div>

                <div className="grid grid-cols-3 gap-6">

                  <input
                    type="number"
                    placeholder="Cost Price"
                    className="bg-[#f4f7fe] p-4 rounded-2xl border outline-none"
                  />

                  <input
                    type="number"
                    placeholder="Selling Price"
                    className="bg-[#f4f7fe] p-4 rounded-2xl border outline-none"
                  />

                  <input
                    type="number"
                    placeholder="Discount (%)"
                    className="bg-[#f4f7fe] p-4 rounded-2xl border outline-none"
                  />

                </div>
              </div>

              {/* SUPPLIER */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <div className="flex items-center gap-4 mb-8">

                  <FaTruck className="text-3xl text-orange-600" />

                  <h2 className="text-3xl font-bold">
                    Supplier Details
                  </h2>

                </div>

                <div className="grid grid-cols-2 gap-6">

                  <input
                    type="text"
                    placeholder="Supplier Name"
                    className="bg-[#f4f7fe] p-4 rounded-2xl border outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Contact Number"
                    className="bg-[#f4f7fe] p-4 rounded-2xl border outline-none"
                  />

                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="space-y-8">

              {/* IMAGE */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <h2 className="text-2xl font-bold mb-6">
                  Product Image
                </h2>

                <div className="border-2 border-dashed border-blue-300 rounded-3xl p-10 text-center">

                  <FaUpload className="text-6xl text-blue-600 mx-auto mb-5" />

                  <p className="font-semibold">
                    Upload Product Image
                  </p>

                  <p className="text-gray-500 mt-2">
                    PNG, JPG, JPEG
                  </p>

                  <input
                    type="file"
                    className="mt-5"
                  />
                </div>
              </div>

              {/* TAGS */}

              <div className="bg-white rounded-3xl p-8 shadow-sm">

                <div className="flex items-center gap-3 mb-6">

                  <FaTags className="text-blue-600" />

                  <h2 className="text-2xl font-bold">
                    Product Tags
                  </h2>

                </div>

                <input
                  type="text"
                  placeholder="Gaming, Laptop, Electronics"
                  className="w-full bg-[#f4f7fe] p-4 rounded-2xl border outline-none"
                />
              </div>

              {/* ACTIONS */}

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white">

                <h2 className="text-3xl font-bold mb-6">
                  Actions
                </h2>

                <div className="space-y-4">

                  <button className="w-full bg-white text-blue-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-3">
                    <FaSave />
                    Save Product
                  </button>

                  <button className="w-full bg-white/20 py-4 rounded-2xl font-bold flex items-center justify-center gap-3">
                    <FaUndo />
                    Reset Form
                  </button>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;