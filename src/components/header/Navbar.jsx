import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./HeaderStyle.css";

export function Navbar({ menuOpen, setMenuOpen }) {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);
  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(var(--bs-primary-rgb),0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg navbar-nav pb-15">
      <div className="w-full relative mr-20">
        <div className="flex items-center ">
<NavLink
  to="/AsteZeriakobDycenterwebProject"
  className="flex items-center gap-3 ml-6"
>
  {/* Logo Image */}
  <img
    src="diy.png"
    alt="Zereyakob DIY Center Logo"
    className="w-12 h-12 object-contain drop-shadow-md "
  />

  {/* Logo Text */}
  <div className="leading-tight">
    <h1 className="text-white text-lg font-bold tracking-wide">
      Zereyakob
    </h1>
    <span className="text-sm text-orange-400 font-semibold tracking-wider">
      DIY CENTER
    </span>
  </div>
</NavLink>

          <div
            className="md:hidden w-7 h-5 cursor-pointer z-40 absolute right-0"
            onClick={() => setMenuOpen((open) => !open)}
          >
            &#9776;
          </div>

          <div className="hidden md:flex items-center space-x-4 mt-3 ml-70 ">
            <NavLink
              to="/AsteZeriakobDycenterwebProject"
              className="text-gray-300 hover:text-white transition-colors ml-5 nav-link"
            >
              Home
            </NavLink>
            <NavLink
              to="AsteZeriakobDycenterwebProject/news"
              className="text-gray-300 hover:text-white transition-colors nav-link"
            >
              News
            </NavLink>
            <NavLink
              to="AsteZeriakobDycenterwebProject/about"
              className="text-gray-300 hover:text-white transition-colors nav-link"
            >
              About
            </NavLink>
            <NavLink
              to="AsteZeriakobDycenterwebProject/booking"
              className="text-gray-300 hover:text-white transition-colors nav-link"
            >
              Booking
            </NavLink>
            <NavLink
              to="AsteZeriakobDycenterwebProject/service"
              className="text-gray-300 hover:text-white transition-colors nav-link"
            >
              Services
            </NavLink>
            <NavLink
              to="AsteZeriakobDycenterwebProject/feedback"
              className="text-gray-300 hover:text-white transition-colors nav-link"
            >
              Feedback
            </NavLink>
            <NavLink
              to="AsteZeriakobDycenterwebProject/vacancy"
              className="text-gray-300 hover:text-white transition-colors nav-link"
            >
              Vacancy
            </NavLink>
            <NavLink
              to="AsteZeriakobDycenterwebProject/login"
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
