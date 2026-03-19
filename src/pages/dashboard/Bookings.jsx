import axios from "axios";
import { useState, useEffect } from "react";

export function Bookings() {
  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("all");

  // -------- LOAD BOOKINGS --------
  async function loadBookings() {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings",
        axiosConfig,
      );
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to load bookings", err);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  // -------- UPDATE STATUS --------
  async function updateStatus(id, status) {
    try {
      await axios.patch(
        `http://localhost:5000/api/bookings/${id}/status`,
        { status },
        axiosConfig,
      );
      loadBookings();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  }

  // -------- DELETE --------
  async function deleteBooking(id) {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/bookings/${id}`,
        axiosConfig,
      );
      alert(res.data.message);
      loadBookings();
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  // -------- FILTER --------
  const today = new Date().toISOString().split("T")[0];
  const filteredBookings = books.filter((book) => {
    if (filter === "future") return book.booking_date >= today;
    if (filter === "past") return book.booking_date < today;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">📅 Bookings Management</h2>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg border ${
            filter === "all"
              ? "bg-green-600 text-white"
              : "border-gray-300 text-gray-600"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("future")}
          className={`px-4 py-2 rounded-lg border ${
            filter === "future"
              ? "bg-blue-500 text-white"
              : "border-blue-500 text-blue-500"
          }`}
        >
          Future
        </button>

        <button
          onClick={() => setFilter("past")}
          className={`px-4 py-2 rounded-lg border ${
            filter === "past"
              ? "bg-gray-600 text-white"
              : "border-gray-400 text-gray-600"
          }`}
        >
          Past
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Facility</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((book) => (
              <tr key={book.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{book.fullName}</td>
                <td className="px-4 py-3">{book.email}</td>
                <td className="px-4 py-3">{book.phone}</td>
                <td className="px-4 py-3">{book.facility}</td>
                <td className="px-4 py-3">
                  {new Date(book.booking_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">{book.booking_time}</td>
                <td className="px-4 py-3">{book.duration}</td>

                {/* STATUS BADGE */}
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      book.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : book.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3 flex gap-2 justify-center">
                  {book.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(book.id, "approved")}
                        className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(book.id, "rejected")}
                        className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => deleteBooking(book.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-400">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
