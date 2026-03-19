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
import { VacancyPage } from "./pages/VacancyPage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { Bookings } from "./pages/dashboard/Bookings";
import { DashboardHome } from "./pages/dashboard/DashboardHome";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./pages/dashboard/DashboardLayout";
import { News } from "./pages/dashboard/News";
import { Categories } from "./pages/dashboard/Categories";
import { Comments } from "./pages/dashboard/Comments";
import { Users } from "./pages/dashboard/Users";
import { Jobs } from "./pages/dashboard/Jobs";
import "./index.css";
import "./App.css";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorNews, setErrorNews] = useState("");

  // ✅ DEFINE FUNCTION OUTSIDE useEffect
  const fetchNews = async () => {
    setLoadingNews(true);
    setErrorNews("");

    try {
      const res = await axios.get("http://localhost:5000/api/news");
      setNews(res.data); //When data comes successfully the in the finally block:false
    } catch (err) {
      console.error(err);
      setErrorNews("Failed to load news");
    } finally {
      setLoadingNews(false); //Loading finished. Data is ready.
    }
  };

  // ✅ CALL IT ONCE
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      {!isDashboard && (
        <>
          <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />

        {/* ✅ PASS FUNCTION CORRECTLY */}
        <Route
          path="news"
          element={
            <NewsPage
              news={news}
              loading={loadingNews}
              error={errorNews}
              reloadNews={fetchNews}
            />
          }
        />

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
          <Route index element={<DashboardHome news={news} />} />
          <Route path="news" element={<News />} />
          <Route path="categories" element={<Categories />} />
          <Route path="comments" element={<Comments />} />
          <Route path="booking" element={<Bookings />} />
          <Route path="users" element={<Users />} />
          <Route path="jobs" element={<Jobs />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
