import { NavLink } from "react-router-dom";
export function MobileMenu({ menuOpen, setMenuOpen }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full  bg-[rgba(10,10,10,0.8)] z-41 flex flex-col items-center justify-center overflow-y-auto py-10 transition-all duration-300 ease-in-out   ${
        menuOpen
          ? "h-screen bg-red-500 opacity-100 pointer-events-auto"
          : "h-screen opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-3 right-2 text-white  bg-black text-3xl focus:outline-none cursor-pointer px-1  "
        aria-label="Close-Menu"
      >
        &times;
      </button>
      <NavLink
        to="/"
        onClick={() => setMenuOpen(false)}
        className={` font-semibold text-white my-3 transform transition-transform duration-300  ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        onClick={() => setMenuOpen(false)}
        className={`font-semibold text-white my-3  transform transition-transform duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        About
      </NavLink>
      <NavLink
        to="/booking"
        onClick={() => setMenuOpen(false)}
        className={` font-semibold text-white my-3  transform transition-transform duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        Booking
      </NavLink>
      <NavLink
        to="/vacancy"
        onClick={() => setMenuOpen(false)}
        className={` font-semibold text-white my-3  transform transition-transform duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        vacancy
      </NavLink>
      <NavLink
        to="/feedback"
        onClick={() => setMenuOpen(false)}
        className={` font-semibold text-white my-3 transform transition-transform duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        Feedback
      </NavLink>
      <NavLink
        to="/news"
        onClick={() => setMenuOpen(false)}
        className={` font-semibold text-white my-3  transform transition-transform duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        News
      </NavLink>
      <NavLink
        to="/service"
        onClick={() => setMenuOpen(false)}
        className={` font-semibold text-white my-3 transform transition-transform duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        Service
      </NavLink>
      <NavLink
        to="/login"
        onClick={() => setMenuOpen(false)}
        className={` font-semibold text-white my-3  transform transition-transform duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        Login
      </NavLink>
    </div>
  );
}
