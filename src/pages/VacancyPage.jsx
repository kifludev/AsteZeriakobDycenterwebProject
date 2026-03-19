import { FooterPage } from "../components/FooterPage";
import { useState } from "react";
import axios from "axios";

export function VacancyPage() {
  const [jobs] = useState([
    {
      id: 1,
      title: "Youth Program Coordinator",
      type: "Full-Time",
      location: "Addis Ababa",
      description:
        "Coordinate youth development programs and manage daily activities.",
      deadline: "2026-04-10",
    },
    {
      id: 2,
      title: "IT Support Assistant",
      type: "Part-Time",
      location: "Addis Ababa",
      description:
        "Provide technical support for computer labs and network systems.",
      deadline: "2026-04-05",
    },
    {
      id: 3,
      title: "Sports Trainer (Basketball)",
      type: "Contract",
      location: "Addis Ababa",
      description: "Train and mentor youth in basketball skills and teamwork.",
      deadline: "2026-04-15",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    cv: null,
  });

  // Open modal
  const handleApply = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  // Handle text input change
  const handleChange = (e) => {
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setApplicant({ ...applicant, cv: e.target.files[0] });
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!applicant.cv) {
      alert("Please upload your CV before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("job_id", selectedJob.id);
    formData.append("name", applicant.name);
    formData.append("email", applicant.email);
    formData.append("phone", applicant.phone);
    formData.append("coverLetter", applicant.coverLetter);
    formData.append("cv", applicant.cv);

    try {
      await axios.post("http://localhost:5000/api/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Application submitted successfully!");
      setShowForm(false);
      setApplicant({
        name: "",
        email: "",
        phone: "",
        coverLetter: "",
        cv: null,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit application. Try again.");
    }
  };

  return (
    <>
      <title>The vacancy page of the website</title>
      <section className="bg-[#740305] text-white py-12 mt-12 text-center">
        <h1 className="text-4xl font-bold">Vacancies</h1>
        <p className="mt-2 text-lg">
          Join Atse Zeriakop Youth Center and make an impact in the community
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {jobs.length === 0 ? (
          <div className="text-center text-gray-500">
            No vacancies available at the moment.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col"
              >
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <div className="text-sm text-gray-500 mb-2">
                  📍 {job.location}
                </div>
                <div className="text-sm mb-2">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm flex-grow">
                  {job.description}
                </p>
                <div className="mt-4 text-sm text-gray-400">
                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                </div>
                <button
                  onClick={() => handleApply(job)}
                  className="mt-4 bg-[#740305] text-white py-2 rounded-lg hover:opacity-90"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
              <h3 className="text-xl font-bold mb-4">
                Apply for: {selectedJob.title}
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={applicant.name}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={applicant.email}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={applicant.phone}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <textarea
                  name="coverLetter"
                  placeholder="Cover Letter"
                  value={applicant.coverLetter}
                  onChange={handleChange}
                  rows={4}
                  className="border p-2 rounded"
                />
                {/* ✅ CV Upload */}
                <input
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="border p-2 rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#740305] text-white py-2 rounded-lg hover:opacity-90"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Didn’t find a suitable role? Send us your CV for future
            opportunities.
          </p>
          <button className="border border-[#740305] text-[#740305] px-6 py-2 rounded-lg hover:bg-[#740305] hover:text-white transition">
            Submit CV
          </button>
        </div>
      </div>

      <FooterPage />
    </>
  );
}
