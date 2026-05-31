import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/categoryService";
import {
  FaBell,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaLaptop,
  FaMobileAlt,
  FaChair,
  FaTshirt,
  FaBoxOpen,
  FaLayerGroup,
} from "react-icons/fa";

const categoryStyles = [
  {
    icon: <FaLaptop />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <FaMobileAlt />,
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <FaChair />,
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: <FaTshirt />,
    color: "bg-purple-100 text-purple-600",
  },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState("");

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getCategories();
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Categories load nahi zalyat");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const categoryCards = useMemo(
    () =>
      categories.map((category, index) => ({
        ...category,
        products: 0,
        ...categoryStyles[index % categoryStyles.length],
      })),
    [categories],
  );

  const filteredCategories = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return categoryCards;
    }

    return categoryCards.filter((category) =>
      [category.name, category.description].some((value) =>
        String(value || "").toLowerCase().includes(query),
      ),
    );
  }, [categoryCards, searchTerm]);

  const resetCategoryForm = () => {
    setNewCategoryName("");
    setNewCategoryDescription("");
    setEditingCategoryId("");
  };

  const handleSaveCategory = async (event) => {
    event.preventDefault();

    if (!newCategoryName.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      setMessage("");

      const categoryPayload = {
        name: newCategoryName.trim(),
        description: newCategoryDescription.trim(),
      };

      if (editingCategoryId) {
        await updateCategory(editingCategoryId, categoryPayload);
        setMessage("Category updated successfully");
      } else {
        await createCategory(categoryPayload);
        setMessage("Category added successfully");
      }

      resetCategoryForm();
      await loadCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Category save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategoryId(category._id);
    setNewCategoryName(category.name || "");
    setNewCategoryDescription(category.description || "");
    setError("");
    setMessage("");
  };

  const handleDeleteCategory = async (id) => {
    if (!id) {
      setError("Category id missing aahe");
      return;
    }

    const shouldDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setMessage("");
      await deleteCategory(id);
      setCategories((currentCategories) =>
        currentCategories.filter((category) => category._id !== id),
      );
      setMessage("Category deleted successfully");
      if (editingCategoryId === id) {
        resetCategoryForm();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Category delete failed");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Sidebar />

      <div className="ml-[280px] w-full">
        <div className="bg-white border-b px-10 py-6 flex justify-between items-center">
          <div className="relative w-[420px]">
            <FaSearch className="absolute top-5 left-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full bg-[#f4f7fe] border border-gray-200 rounded-2xl pl-14 py-4 outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <FaBell className="text-3xl text-blue-600" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                4
              </span>
            </div>

            <img
              src="/Rutika.jpg.jpeg"
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />
          </div>
        </div>

        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-6xl font-bold text-[#061539]">
                Categories
              </h1>

              <p className="text-gray-500 text-xl mt-3">
                Manage product categories and inventory groups.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSaveCategory}
            className="bg-white rounded-3xl p-6 shadow-sm mb-8 grid grid-cols-[1fr_1fr_auto_auto] gap-4"
          >
            <input
              type="text"
              placeholder="Category name"
              value={newCategoryName}
              onChange={(event) => setNewCategoryName(event.target.value)}
              className="bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Description"
              value={newCategoryDescription}
              onChange={(event) =>
                setNewCategoryDescription(event.target.value)
              }
              className="bg-[#f4f7fe] border border-gray-200 rounded-2xl px-5 py-4 outline-none"
            />

            <button
              type="submit"
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 shadow-lg disabled:opacity-60"
            >
              <FaPlus />
              {isSaving
                ? "Saving..."
                : editingCategoryId
                ? "Update Category"
                : "Add Category"}
            </button>

            {editingCategoryId && (
              <button
                type="button"
                onClick={resetCategoryForm}
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-2xl font-semibold"
              >
                Cancel
              </button>
            )}
          </form>

          {message && (
            <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl mb-6 font-semibold">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 px-5 py-3 rounded-2xl mb-6 font-semibold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-4 gap-8 mb-10">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Total Categories</p>
                  <h2 className="text-5xl font-bold mt-3">
                    {categories.length}
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl">
                  <FaLayerGroup />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Products</p>
                  <h2 className="text-5xl font-bold mt-3">0</h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-3xl">
                  <FaBoxOpen />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Active</p>
                  <h2 className="text-5xl font-bold mt-3">
                    {categories.length}
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-3xl">
                  <FaLayerGroup />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Inactive</p>
                  <h2 className="text-5xl font-bold mt-3">0</h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-3xl">
                  <FaLayerGroup />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading && (
              <div className="col-span-full bg-white rounded-3xl p-8 text-center text-gray-500">
                Categories loading...
              </div>
            )}

            {!isLoading &&
              filteredCategories.map((category) => (
                <div
                  key={category._id}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 ${category.color}`}
                  >
                    {category.icon}
                  </div>

                  <h2 className="text-2xl font-bold text-[#061539]">
                    {category.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {category.description || "No description"}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleEditCategory(category)}
                      className="flex-1 bg-blue-100 text-blue-600 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(category._id)}
                      disabled={deletingId === category._id}
                      className="flex-1 bg-red-100 text-red-600 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all disabled:opacity-60"
                    >
                      <FaTrash />
                      {deletingId === category._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}

            {!isLoading && filteredCategories.length === 0 && (
              <div className="col-span-full bg-white rounded-3xl p-8 text-center text-gray-500">
                Category data available nahi aahe
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-sm mt-10 overflow-hidden">
            <div className="px-8 py-6 border-b">
              <h2 className="text-3xl font-bold text-[#061539]">
                Category List
              </h2>
            </div>

            <table className="w-full">
              <thead className="bg-[#f8faff]">
                <tr>
                  <th className="text-left p-6">Category</th>
                  <th className="text-left p-6">Description</th>
                  <th className="text-left p-6">Status</th>
                  <th className="text-center p-6">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="p-6 font-semibold">{item.name}</td>

                    <td className="p-6">{item.description || "-"}</td>

                    <td className="p-6">
                      <span className="bg-green-100 text-green-600 px-4 py-2 rounded-xl">
                        Active
                      </span>
                    </td>

                    <td className="p-6">
                      <div className="flex justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleEditCategory(item)}
                          className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(item._id)}
                          disabled={deletingId === item._id}
                          className="bg-red-100 text-red-600 px-4 py-2 rounded-xl disabled:opacity-60"
                        >
                          {deletingId === item._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!isLoading && filteredCategories.length === 0 && (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="4">
                      Category data available nahi aahe
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
