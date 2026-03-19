import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/DashboardNavbar";
import { Sidebar } from "../../components/Sidebar";

export function DashboardLayout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <Navbar onLogout={logout} />

      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
}
