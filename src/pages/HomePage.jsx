import { Link } from "react-router-dom";
import "./HomePage.css";
import { FooterPage } from "../components/FooterPage";

export function HomePage() {
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
                Empowering Youth for Leadership & Development
              </h1>

              <p className="text-lg text-white mt-4">
                Welcome to Zereyakob DIY Center — a place where young people
                grow, learn, and lead.
              </p>

              <div className="mt-6 flex gap-4">
                <Link
                  to="/admission"
                  className=" text-black px-6 py-3 rounded-lg font-semibold"
                >
                  Register Now
                </Link>

                <Link
                  to="/about"
                  className="border border-red px-6 py-3 rounded-lg"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-10">
            Why Choose Zereyakob DIY Center?
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <i className="fas fa-graduation-cap text-4xl text-primary mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Quality Education</h3>
              <p className="mb-4">
                Our programs are designed to meet international standards with
                experienced faculty members.
              </p>
              <Link
                to="/academics"
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Learn More
              </Link>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <i className="fas fa-flask text-4xl text-primary mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">
                Research Excellence
              </h3>
              <p className="mb-4">
                State-of-the-art research facilities with opportunities for
                student involvement.
              </p>
              <Link
                to="/research"
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Explore Research
              </Link>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <i className="fas fa-hands-helping text-4xl text-primary mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Student Support</h3>
              <p className="mb-4">
                Comprehensive support services including counseling, career
                guidance, and more.
              </p>
              <Link
                to="/services"
                className="bg-primary text-white px-4 py-2 rounded"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-10">
            Latest News & Events
          </h2>

          <div id="newsPreview" className="grid md:grid-cols-3 gap-6"></div>

          <div className="text-center mt-6">
            <Link
              to="/news"
              className="bg-primary text-white px-6 py-3 rounded"
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
              <h2 className="text-primary text-2xl font-bold">1000+</h2>
              <p>Youth Trained</p>
            </div>

            <div>
              <h2 className="text-primary text-2xl font-bold">200+</h2>
              <p>Faculty Members</p>
            </div>

            <div>
              <h2 className="text-primary text-2xl font-bold">50+</h2>
              <p>Community Projects</p>
            </div>

            <div>
              <h2 className="text-primary text-2xl font-bold">35</h2>
              <p>Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      <FooterPage />
    </>
  );
}
