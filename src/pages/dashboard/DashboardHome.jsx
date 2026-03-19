import { useEffect, useState } from "react";
import axios from "axios";

export function DashboardHome({ news }) {
  const [categories, setCategories] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [futureBookings, setFutureBookings] = useState([]);
  const [jobs, setJobs] = useState([]); // ✅ NEW

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data));

    axios
      .get("http://localhost:5000/api/feedback")
      .then((res) => setFeedback(res.data));

    axios.get("http://localhost:5000/api/bookings").then((res) => {
      setBookings(res.data);
      const today = new Date().toISOString().split("T")[0];
      const future = res.data.filter((b) => b.booking_date >= today);
      setFutureBookings(future);
    });

    // ✅ FETCH JOBS (VACANCIES)
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data));
  }, []);

  const stats = [
    {
      title: "News Articles",
      count: news.length,
      icon: "fas fa-newspaper",
      color: "text-blue-500",
    },
    {
      title: "Categories",
      count: categories.length,
      icon: "fas fa-tags",
      color: "text-yellow-500",
    },
    {
      title: "User Comments",
      count: feedback.length,
      icon: "fas fa-comments",
      color: "text-green-500",
    },
    {
      title: "Total Bookings",
      count: bookings.length,
      icon: "fas fa-calendar-check",
      color: "text-red-500",
    },
    {
      title: "Future Bookings",
      count: futureBookings.length,
      icon: "fas fa-forward",
      color: "text-indigo-500",
    },
    {
      title: "Vacancies", // ✅ NEW CARD
      count: jobs.length,
      icon: "fas fa-briefcase",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">📊 Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <i className={`${stat.icon} ${stat.color} text-3xl mb-3`}></i>
            <h3 className="text-2xl font-bold">{stat.count}</h3>
            <p className="text-gray-600 mt-1 text-center">{stat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
