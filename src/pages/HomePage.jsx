import { Link } from "react-router-dom";
import "./HomePage.css";
import { FooterPage } from "../components/FooterPage";
import { useEffect, useState } from "react";
import axios from "axios";

export function HomePage() {
  const [news, setNews] = useState([]);
  const loadNews = async () => {
    try {
      const res = await axios.get("http://localhost:5005/api/news");

      setNews(res.data);
      const latest = res.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

      setNews(latest);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  // Mock news (replace later with API)

  return (
    <>
      <link rel="icon" href="/logo1.png" />
      <title>Zereyakob DIY Center home page</title>

      {/* HERO */}
      <section className="min-h-screen flex items-center hero-banner">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center min-h-screen">
            <div className="w-full md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold">
                Empowering Youth Through Training & Opportunities
              </h1>

              <p className="text-lg text-white mt-4">
                Free computer training, online courses, and scholarships for
                youth aged 18-35.
              </p>

              <div className="mt-6 flex gap-4">
                <Link
                  to="/admission"
                  className="text-white px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:scale-105 transition"
                >
                  Register Now
                </Link>

                <Link
                  to="/about"
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:scale-105 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS (ANIMATED) */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-10">
            Our Training Programs
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white shadow-md rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <i className="fas fa-laptop-code text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Online Training</h3>
              <p>Flexible courses anytime, anywhere.</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <i className="fas fa-award text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Scholarship</h3>
              <p>Learn programming, internet, and office tools.</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <i className="fas fa-laptop-code text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">
                Free Computer Training
              </h3>
              <p>Get funded training opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Eligibility</h2>
          <div className="bg-white shadow-md rounded-xl p-6 transform transition hover:scale-105">
            <i className="fas fa-user-check text-4xl text-purple-600 mb-4"></i>
            <p className="text-lg">
              Age requirement: <strong> 18 &minus;35 years</strong>
            </p>
          </div>
        </div>
      </section>

      {/* NEWS SECTION (DYNAMIC RENDER) */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-10">
            Latest News & Events
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 transform transition duration-300  hover:shadow-xl">
            {news.map((newsItem) => (
              <div
                key={newsItem.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                {/* IMAGE */}
                {newsItem.image ? (
                  <img
                    src={`http://localhost:5005/uploads/${newsItem.image}`}
                    alt={newsItem.title}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="h-56 flex items-center justify-center bg-gray-100 text-gray-400 text-4xl">
                    📰
                  </div>
                )}

                {/* BODY */}
                <div className="p-4 flex flex-col flex-grow">
                  <h5 className="text-lg font-semibold mb-2">
                    {newsItem.title || "Untitled"}
                  </h5>

                  <p className="text-gray-600 text-sm flex-grow">
                    {newsItem.content
                      ? newsItem.content.substring(0, 120) + "..."
                      : "No content available"}
                  </p>

                  <span className="text-xs text-gray-400 mt-4">
                    upload at:
                    {newsItem.created_at ? (
                      <strong>
                        {new Date(newsItem.created_at).toLocaleDateString()}
                      </strong>
                    ) : (
                      "Date not available"
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              to="/news"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:scale-105 transition"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h2 className="text-blue-600 text-2xl font-bold">1000+</h2>
              <p>Youth Trained</p>
            </div>

            <div>
              <h2 className="text-blue-600 text-2xl font-bold">200+</h2>
              <p>Faculty Members</p>
            </div>

            <div>
              <h2 className="text-blue-600 text-2xl font-bold">50+</h2>
              <p>Community Projects</p>
            </div>

            <div>
              <h2 className="text-blue-600 text-2xl font-bold">35</h2>
              <p>Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      <FooterPage />
    </>
  );
}
