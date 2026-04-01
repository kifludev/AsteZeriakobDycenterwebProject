import { NavLink } from "react-router-dom";

export function Sidebar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-[#740305] text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="w-56 bg-gray-900 text-white p-4 min-h-screen">
      <h4 className="text-xl font-bold mb-6">Admin Panel</h4>

      <div className="flex flex-col gap-2">
        <NavLink to="/dashboard" end className={linkClass}>
          <i className="fas fa-tachometer-alt"></i>
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/news" className={linkClass}>
          <i className="fas fa-newspaper"></i>
          News
        </NavLink>

        <NavLink to="/dashboard/categories" className={linkClass}>
          <i className="fas fa-tags"></i>
          Categories
        </NavLink>

        <NavLink to="/dashboard/comments" className={linkClass}>
          <i className="fas fa-comments"></i>
          Comments
        </NavLink>

        <NavLink to="/dashboard/booking" className={linkClass}>
          <i className="fas fa-file-alt"></i>
          Bookings
        </NavLink>
        {token && role === "admin" && (
          <NavLink to="/dashboard/users" className={linkClass}>
            <i className="fas fa-user"></i>
            Users
          </NavLink>
        )}

        <NavLink to="/dashboard/jobs" className={linkClass}>
          <i className="fas fa-briefcase"></i>
          Vacancies
        </NavLink>

        {/* ✅ NEW */}
        {token && role === "admin" && (
          <NavLink to="/dashboard/applications" className={linkClass}>
            <i className="fas fa-file-alt"></i>
            Applications
          </NavLink>
        )}
      </div>
    </div>
  );
}
