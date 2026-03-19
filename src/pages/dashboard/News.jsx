import axios from "axios";
import { useState, useEffect } from "react";

export function News() {
  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsCategory, setNewsCategory] = useState("");
  const [newsImage, setNewsImage] = useState(null);

  const [editNewsData, setEditNewsData] = useState(null);

  useEffect(() => {
    loadNews();
    loadCategories();
  }, []);

  async function loadNews() {
    const res = await axios.get("http://localhost:5000/api/news", axiosConfig);
    setNews(res.data);
  }

  async function loadCategories() {
    const res = await axios.get(
      "http://localhost:5000/api/categories",
      axiosConfig,
    );
    setCategories(res.data);
  }

  async function handleAddNews() {
    if (!newsTitle.trim() || !newsContent.trim())
      return alert("Title & content required");
    if (!newsImage) return alert("Image required");

    const formData = new FormData();
    formData.append("title", newsTitle);
    formData.append("content", newsContent);
    formData.append("category_id", newsCategory);
    formData.append("image", newsImage);

    await axios.post("http://localhost:5000/api/news", formData, {
      headers: {
        ...axiosConfig.headers,
        "Content-Type": "multipart/form-data",
      },
    });

    setNewsTitle("");
    setNewsContent("");
    setNewsCategory("");
    setNewsImage(null);
    loadNews();
  }

  async function handleDeleteNews(id) {
    if (!confirm("Delete this news?")) return;
    await axios.delete(`http://localhost:5000/api/news/${id}`, axiosConfig);
    loadNews();
  }

  function handleEditNews(newsItem) {
    setEditNewsData({ ...newsItem, imageFile: null });
  }

  async function handleUpdateNews() {
    const { id, title, content, category_id, imageFile } = editNewsData;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", category_id);
    if (imageFile) formData.append("image", imageFile);

    await axios.put(`http://localhost:5000/api/news/${id}`, formData, {
      headers: {
        ...axiosConfig.headers,
        "Content-Type": "multipart/form-data",
      },
    });

    setEditNewsData(null);
    loadNews();
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        📰 News Management
      </h2>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {editNewsData ? "✏️ Edit News" : "➕ Add News Article"}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Title */}
          <input
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="News Title"
            value={editNewsData ? editNewsData.title : newsTitle}
            onChange={(e) =>
              editNewsData
                ? setEditNewsData({ ...editNewsData, title: e.target.value })
                : setNewsTitle(e.target.value)
            }
          />

          {/* Category */}
          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            value={editNewsData ? editNewsData.category_id : newsCategory}
            onChange={(e) =>
              editNewsData
                ? setEditNewsData({
                    ...editNewsData,
                    category_id: e.target.value,
                  })
                : setNewsCategory(e.target.value)
            }
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Content */}
          <textarea
            className="md:col-span-2 border rounded-lg px-3 py-2 h-28 focus:ring-2 focus:ring-blue-400"
            placeholder="News Content..."
            value={editNewsData ? editNewsData.content : newsContent}
            onChange={(e) =>
              editNewsData
                ? setEditNewsData({
                    ...editNewsData,
                    content: e.target.value,
                  })
                : setNewsContent(e.target.value)
            }
          />

          {/* File */}
          <input
            type="file"
            className="md:col-span-2 border rounded-lg px-3 py-2 bg-gray-50"
            onChange={(e) =>
              editNewsData
                ? setEditNewsData({
                    ...editNewsData,
                    imageFile: e.target.files[0],
                  })
                : setNewsImage(e.target.files[0])
            }
          />
        </div>

        {/* Button */}
        <div className="mt-4">
          <button
            onClick={editNewsData ? handleUpdateNews : handleAddNews}
            className={`px-6 py-2 rounded-lg text-white font-medium shadow ${
              editNewsData
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {editNewsData ? "Update News" : "Publish News"}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">📋 Existing News</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Content</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {item.title}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {item.content.substring(0, 60)}...
                  </td>

                  <td className="px-4 py-3 text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => handleEditNews(item)}
                      className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteNews(item.id)}
                      className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {news.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No news articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
