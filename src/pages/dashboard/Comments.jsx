import { useState, useEffect } from "react";
import axios from "axios";

export function Comments() {
  const [comments, setComments] = useState([]);

  // -------- LOAD COMMENTS --------
  async function loadComments() {
    const token = localStorage.getItem("token"); // always get latest token
    try {
      const res = await axios.get("http://localhost:5000/api/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data); // safe inside effect or function
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  }

  // -------- INITIAL LOAD --------
  useEffect(() => {
    async function fetchComments() {
      await loadComments();
    }
    fetchComments();
  }, []); // runs once on mount

  // -------- DELETE COMMENT --------
  async function handleDeleteComment(id) {
    if (!confirm("Delete this comment?")) return;

    const token = localStorage.getItem("token"); // fresh token
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadComments(); // reload comments after deletion
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete comment");
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">💬 Comments Management</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Comment
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td className="px-4 py-2">{comment.name}</td>
                <td className="px-4 py-2">{comment.message}</td>
                <td className="px-4 py-2">
                  {new Date(comment.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {comments.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                  No comments available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
