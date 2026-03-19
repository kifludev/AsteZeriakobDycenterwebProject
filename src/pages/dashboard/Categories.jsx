import { useState, useEffect } from "react";
import axios from "axios";

export function Categories() {
  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  // -------- LOAD CATEGORIES --------
  async function loadCategories() {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/categories",
        axiosConfig,
      );
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  // -------- ADD CATEGORY --------
  async function handleAddCategory() {
    if (!categoryName.trim()) return alert("Category required");

    try {
      await axios.post(
        "http://localhost:5000/api/categories",
        { name: categoryName },
        axiosConfig,
      );
      setCategoryName("");
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add category");
    }
  }

  // -------- EDIT CATEGORY --------
  async function handleEditCategory(id, currentName) {
    const newName = prompt("Edit category name:", currentName);
    if (!newName) return;

    try {
      await axios.put(
        `http://localhost:5000/api/categories/${id}`,
        { name: newName },
        axiosConfig,
      );
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update category");
    }
  }

  // -------- DELETE CATEGORY --------
  async function handleDeleteCategory(id) {
    if (!window.confirm("Delete this category?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/categories/${id}`,
        axiosConfig,
      );
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete category");
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">🏷️ Categories Management</h2>

      {/* Add Category */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleAddCategory}
        >
          Add
        </button>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((categorie) => (
              <tr key={categorie.id}>
                <td className="px-4 py-2">{categorie.name}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm"
                    onClick={() =>
                      handleEditCategory(categorie.id, categorie.name)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                    onClick={() => handleDeleteCategory(categorie.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="2" className="px-4 py-2 text-center text-gray-500">
                  No categories available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
