export function Navbar({ onLogout }) {
  return (
    <nav className="bg-[#740305] text-white px-4 py-3 flex items-center justify-between shadow-md">
      {/* TITLE */}
      <span className="text-lg font-semibold">Admin Dashboard</span>

      {/* LOGOUT BUTTON */}
      <button
        onClick={onLogout}
        className="flex items-center gap-2 border border-red-400 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition"
      >
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </button>
    </nav>
  );
}
