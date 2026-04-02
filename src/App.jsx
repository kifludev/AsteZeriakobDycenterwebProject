import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { MobileMenu } from "./components/header/MobileMenu";
import { Navbar } from "./components/header/Navbar";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { ServicePage } from "./pages/ServicePage";
import { BookingPage } from "./pages/BookingPage";
import { NewsPage } from "./pages/NewsPage";
import { VacancyPage } from "./pages/vacancy/VacancyPage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { Bookings } from "./pages/dashboard/Bookings";
import { DashboardHome } from "./pages/dashboard/DashboardHome";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./pages/dashboard/DashboardLayout";
import { News } from "./pages/dashboard/News";
import { Categories } from "./pages/dashboard/Categories";
import { Comments } from "./pages/dashboard/Comments";
import { Users } from "./pages/dashboard/user/Users";
import { Jobs } from "./pages/dashboard/Jobs/Jobs";
import { Applications } from "./pages/dashboard/Applications";
import "./index.css";
import "./App.css";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isDashboard && (
        <>
          <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </>
      )}

      <Routes>
        <Route path="AsteZeriakobDycenterwebProject" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />

        {/* ✅ PASS FUNCTION CORRECTLY */}
        <Route path="news" element={<NewsPage />} />

        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/vacancy" element={<VacancyPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* 🔐 Dashboard */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="news" element={<News />} />
          <Route path="categories" element={<Categories />} />
          <Route path="comments" element={<Comments />} />
          <Route path="booking" element={<Bookings />} />
          <Route path="users" element={<Users />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="applications" element={<Applications />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
