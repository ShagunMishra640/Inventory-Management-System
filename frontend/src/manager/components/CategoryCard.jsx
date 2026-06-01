import {
  FaEdit,
  FaTrash,
  FaBoxes,
} from "react-icons/fa";

export default function CategoryCard({
  category,
  icon,
  color = "from-blue-500 to-indigo-600",
  onEdit,
  onDelete,
  isDeleting = false,
}) {
  const totalProducts = Number(category.totalProducts ?? category.products ?? 0);
  const stock = Number(category.stock ?? 0);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Top Section */}
      <div className={`bg-gradient-to-r ${color} p-5 text-white`}>
        <div className="flex justify-between items-center">
          <span className="text-3xl">
            {icon || <FaBoxes />}
          </span>

          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            {totalProducts} Products
          </span>
        </div>

        <h2 className="text-xl font-bold mt-4">
          {category.name || "Unnamed Category"}
        </h2>
      </div>

      {/* Body */}
      <div className="p-5">

        <p className="text-gray-600 text-sm mb-4">
          {category.description || "No description"}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">

          <div className="bg-gray-100 p-3 rounded-xl text-center">
            <p className="text-gray-500 text-sm">
              Products
            </p>

            <h3 className="font-bold text-lg">
              {totalProducts}
            </h3>
          </div>

          <div className="bg-gray-100 p-3 rounded-xl text-center">
            <p className="text-gray-500 text-sm">
              Stock
            </p>

            <h3 className="font-bold text-lg">
              {stock}
            </h3>
          </div>

        </div>

        {/* Actions */}

        <div className="flex gap-3">

          <button
            type="button"
            onClick={() => onEdit?.(category)}
            className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-200"
          >
            <FaEdit />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(category._id)}
            disabled={isDeleting}
            className="flex-1 bg-red-100 text-red-600 py-2 rounded-xl flex justify-center items-center gap-2 hover:bg-red-200 disabled:opacity-60"
          >
            <FaTrash />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}
