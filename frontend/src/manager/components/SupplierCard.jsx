import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaTruck,
} from "react-icons/fa";

export default function SupplierCard({
  supplier,
  onEdit,
  onDelete,
  isDeleting = false,
}) {
  const supplierId = supplier._id || supplier.id;
  const displayId = supplierId ? supplierId.slice(-6).toUpperCase() : "NEW";
  const avatarUrl =
    supplier.logo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      supplier.name || "Supplier"
    )}`;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-5 text-white">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={supplier.name || "Supplier"}
            className="w-16 h-16 rounded-full border-4 border-white object-cover"
          />

          <div>
            <h2 className="text-xl font-bold">
              {supplier.name}
            </h2>

            <p className="text-sm opacity-90">
              Supplier ID: {displayId}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">

        <div className="space-y-3">

          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-blue-500" />
            <span>{supplier.email || "-"}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FaPhone className="text-green-500" />
            <span>{supplier.phone || "-"}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-red-500" />
            <span>{supplier.address || "Address not added"}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FaTruck className="text-orange-500" />
            <span>
              Products Supplied:{" "}
              {supplier.products || 0}
            </span>
          </div>

        </div>

        {/* Status */}
        <div className="mt-5">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              supplier.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {supplier.status || "Active"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">

          <button
            type="button"
            onClick={() =>
              onEdit?.(supplier)
            }
            className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-200 transition"
          >
            <FaEdit />
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete?.(supplier)
            }
            disabled={isDeleting}
            className="flex-1 bg-red-100 text-red-600 py-2 rounded-xl flex justify-center items-center gap-2 hover:bg-red-200 transition"
          >
            <FaTrash />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}
