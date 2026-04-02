import { useState, useEffect } from "react";
import axios from "axios";
import { FooterPage } from "../components/FooterPage";

export function NewsPage() {
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorNews, setErrorNews] = useState("");

  // ✅ DEFINE FUNCTION OUTSIDE useEffect
  const fetchNews = async () => {
    setLoadingNews(true);
    setErrorNews("");

    try {
      const res = await axios.get("http://localhost:5005/api/news");
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
      <link rel="icon" href="/diy.png" />
      <title>News - Zereyakob DIY Center</title>

      {/* HEADER */}
      <section className="bg-[#740305] text-white py-12 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">
            Zereyakob DIY Center News & Events
          </h1>
          <p className="text-lg">
            Stay updated with the latest announcements and happenings
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Loading */}
        {loadingNews && (
          <div className="text-center">
            <p className="text-gray-500">Loading news...</p>
          </div>
        )}

        {/* Error */}
        {errorNews && (
          <div className="bg-yellow-100 text-yellow-700 p-6 rounded-xl text-center">
            <h4 className="text-xl font-semibold mb-2">Unable to Load News</h4>
            <p>{errorNews}</p>
            <p className="text-sm mt-1">
              Please check if backend is running on port 5000.
            </p>

            <button
              onClick={fetchNews}
              className="mt-4 bg-[#740305] text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loadingNews && !errorNews && news.length === 0 && (
          <div className="text-center text-gray-500">
            No news available at the moment.
          </div>
        )}

        {/* NEWS GRID */}
        {!loadingNews && !errorNews && news.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                {/* IMAGE */}
                {item.image ? (
                  <img
                    src={`http://localhost:5005/uploads/${item.image}`}
                    alt={item.title}
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
                    {item.title || "Untitled"}
                  </h5>

                  <p className="text-gray-600 text-sm flex-grow">
                    {item.content
                      ? item.content.substring(0, 120) + "..."
                      : "No content available"}
                  </p>

                  <span className="text-xs text-gray-400 mt-4">
                    uploaded at:
                    {item.created_at ? (
                      <strong>
                        {new Date(item.created_at).toLocaleDateString()}
                      </strong>
                    ) : (
                      "Date not available"
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BUTTON */}
        <div className="mt-10 text-center">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            ➕ Add News Article
          </button>
        </div>
      </div>

      <FooterPage />
    </>
  );
}
