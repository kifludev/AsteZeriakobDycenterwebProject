import { Link } from "react-router-dom";
import "./header/HeaderStyle.css";
export function FooterPage() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bs-dark)] text-white py-8 w-full">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left */}
          <div>
            <h5 className="text-lg font-semibold mb-2">Zereyakob DIY Center</h5>
            <p>Empowering Youth, Inspiring Change</p>
            <p>Holy Trinity Church, Debre Berhan City</p>
            <p>Contact: info@zereyakob.com | Phone: (251) 912-1267</p>
          </div>

          {/* Right */}
          <div className="md:text-right">
            <h5 className="text-lg font-semibold mb-2">Quick Links</h5>

            <ul className="space-y-1">
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/vacancy" className="hover:underline">
                  Vacancy
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:underline">
                  Booking
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:underline">
                  Contact & Feedback
                </Link>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex md:justify-end gap-4 mt-4 text-lg">
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-white opacity-50" />

        {/* Bottom */}
        <div className="text-center text-sm">
          <p>&copy; {currentYear} Zereyakob DIY Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
