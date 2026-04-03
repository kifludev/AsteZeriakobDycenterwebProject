import axios from "axios";
import { useEffect, useState } from "react";
import { FooterPage } from "../components/FooterPage";

export function FeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [catagory, setCatagory] = useState("general");
  const [message, setMessage] = useState("");
  const [allowContact, setAllowContact] = useState(false);
  const [comments, setComments] = useState([]);

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/feedback", {
        name,
        email,
        catagory,
        message,
        allowContact,
      });
      alert(response.data.message);
      loadComments(); // 🔥 refresh comments after submit
    } catch (error) {
      console.log(error);
      alert("Error submitting feedback");
    }
    e.target.reset();
  };

  const loadComments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/feedback");
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <>
      <link rel="icon" href="/diy.png" />
      <title>Feedback - Zereyakob DIY Center</title>

      {/* HEADER */}
      <section className="bg-[#740305] text-white py-12 mt-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Feedback & Comments</h1>
          <p className="text-lg">We Value Your Input</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* FORM */}
        <section className="mb-12">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-center mb-4">
              Share Your Feedback
            </h3>
            <p className="text-center mb-6 text-gray-600">
              We appreciate your thoughts and suggestions.
            </p>

            <form onSubmit={submitComment} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#740305]"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#740305]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Feedback Category
                </label>
                <select
                  value={catagory}
                  onChange={(e) => setCatagory(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#740305]"
                >
                  <option value="general">General Feedback</option>
                  <option value="admission">Admission Process</option>
                  <option value="academics">Academic Programs</option>
                  <option value="facilities">Campus Facilities</option>
                  <option value="services">Student Services</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="complaint">Complaint</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Your Message *</label>
                <textarea
                  rows="5"
                  required
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#740305]"
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={allowContact}
                  onChange={(e) => setAllowContact(e.target.checked)}
                />
                <label>I allow contact regarding my feedback</label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition duration-300 hover:scale-105 transition"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* COMMENTS */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            Community Feedback
          </h2>

          <div className="bg-gray-100 rounded-xl p-6">
            {comments.length === 0 && (
              <p className="text-center text-gray-500">
                No feedback yet. Be the first!
              </p>
            )}

            {comments.map((coment) => (
              <div
                key={coment.id}
                className="bg-white border rounded-lg p-4 mb-4 shadow-sm"
              >
                <h5 className="font-semibold">
                  {coment.name}{" "}
                  <span className="text-gray-500 text-sm">
                    ({coment.catagory || "General"})
                  </span>
                </h5>

                <p className="my-2">{coment.message}</p>

                <small className="text-gray-500">
                  {new Date(coment.created_at).toLocaleString()}
                </small>

                {coment.allowContact && (
                  <div className="text-green-600 mt-1 text-sm">
                    User allows contact
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Other Ways to Reach Us
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <i className="fas fa-phone text-2xl text-[#740305] mb-3"></i>
              <h4 className="font-semibold mb-2">Phone</h4>
              <p>(555) 123-4567</p>
              <p>(555) 123-4568</p>
              <p>(555) 123-4569</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <i className="fas fa-envelope text-2xl text-[#740305] mb-3"></i>
              <h4 className="font-semibold mb-2">Email</h4>
              <p>info@keamedcollege.edu</p>
              <p>admissions@keamedcollege.edu</p>
              <p>studentservices@keamedcollege.edu</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <i className="fas fa-map-marker-alt text-2xl text-[#740305] mb-3"></i>
              <h4 className="font-semibold mb-2">Visit Us</h4>
              <p>Kea Med College</p>
              <p>123 Medical Drive</p>
              <p>Health City</p>
            </div>
          </div>
        </section>
      </div>

      <FooterPage />
    </>
  );
}
