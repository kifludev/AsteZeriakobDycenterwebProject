import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./HeaderStyle.css";

export function Navbar({ menuOpen, setMenuOpen }) {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);
  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(var(--bs-primary-rgb),0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg navbar-nav">
      <div className="w-full relative">
        <div className="flex items-center justify-between  h-12">
          <NavLink to="/" className="flex items-center ml-7 p-0">
            <img
              src="logo1.png"
              className="mx-0"
              width="150"
              height="auto"
              alt="Zereyakob DIY Center"
            />
            <sub className="text-xl">Zereyakob DIY Center</sub>
          </NavLink>

          <div
            className="md:hidden w-7 h-5 cursor-pointer z-40 absolute right-0"
            onClick={() => setMenuOpen((open) => !open)}
          >
            &#9776;
          </div>

          <div className="hidden md:flex items-center space-x-4 mt-3 ">
            <NavLink
              to="/"
              className="text-gray-300 hover:text-white transition-colors ml-5 nav-link"
            >
              Home
            </NavLink>
            <NavLink
              to="/news"
              className="text-gray-300 hover:text-white transition-colors nav-link"
            >
              News
            </NavLink>
            <NavLink
              to="/about"
              className="text-gray-300 hover:text-white transition-colors nav-link"
            >
              About
            </NavLink>
            <NavLink
              to="/booking"
              className="text-gray-300 hover:text-white transition-colors nav-link"
            >
              Booking
            </NavLink>
            <NavLink
              to="/service"
              className="text-gray-300 hover:text-white transition-colors nav-link"
            >
              Services
            </NavLink>
            <NavLink
              to="/feedback"
              className="text-gray-300 hover:text-white transition-colors nav-link"
            >
              Feedback
            </NavLink>
            <NavLink
              to="/vacancy"
              className="text-gray-300 hover:text-white transition-colors nav-link"
            >
              Vacancy
            </NavLink>
            <NavLink
              to="/login"
              className="text-gray-300 hover:text-white transition-colors nav-link"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
