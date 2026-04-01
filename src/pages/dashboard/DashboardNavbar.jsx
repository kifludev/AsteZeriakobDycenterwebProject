import { MdLogout } from "react-icons/md";

export function DashboardNavbar({ onLogout }) {
  return (
    <nav className="navbar navbar-dark bg-[#740305] px-3 relative">
      <span className="navbar-brand">Admin Dashboard</span>

      <button
        className="flex items-center gap-2 bg-[#740305] absolute right-1 top-2 text-white cursor-pointer border-amber-600"
        onClick={onLogout}
      >
        <MdLogout className="text-lg" />
        <span>Logout</span>
      </button>
    </nav>
  );
}
