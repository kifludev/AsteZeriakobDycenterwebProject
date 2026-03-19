import { useState } from "react";
import { FooterPage } from "../components/FooterPage";

export function NewsPage({ news, loading, error, reloadNews }) {
  return (
    <>
      <link rel="icon" href="/logo1.png" />
      <title>News - Zereyakob DIY Center</title>

      {/* HEADER */}
      <section className="bg-[#740305] text-white py-12 mt-12">
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
        {loading && (
          <div className="text-center">
            <p className="text-gray-500">Loading news...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-yellow-100 text-yellow-700 p-6 rounded-xl text-center">
            <h4 className="text-xl font-semibold mb-2">Unable to Load News</h4>
            <p>{error}</p>
            <p className="text-sm mt-1">
              Please check if backend is running on port 5000.
            </p>

            <button
              onClick={reloadNews}
              className="mt-4 bg-[#740305] text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && news.length === 0 && (
          <div className="text-center text-gray-500">
            No news available at the moment.
          </div>
        )}

        {/* NEWS GRID */}
        {!loading && !error && news.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                {/* IMAGE */}
                {item.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
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
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "Date not available"}
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
