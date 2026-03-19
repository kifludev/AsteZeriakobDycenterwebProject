import { useEffect, useState } from "react";
import axios from "axios";

export function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    salary: "",
    status: "open",
  });

  // Fetch jobs
  const fetchJobs = () => {
    axios.get("http://localhost:5000/api/jobs").then((res) => {
      setJobs(res.data);
    });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add job
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/jobs", form).then(() => {
      setForm({
        title: "",
        location: "",
        salary: "",
        status: "open",
      });
      fetchJobs();
    });
  };

  // Delete job
  const deleteJob = (id) => {
    axios.delete(`http://localhost:5000/api/jobs/${id}`).then(() => {
      fetchJobs();
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">💼 Vacancy Management</h2>

      {/* Add Job Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {/* ✅ Job Title - Large */}
        <textarea
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          rows={3}
          className="border p-2 rounded md:col-span-4"
          required
        />

        {/* Normal Inputs */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 md:col-span-4"
        >
          ➕ Add Job
        </button>
      </form>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Location</th>
              <th className="p-3">Salary</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="p-3">{job.title}</td>
                <td className="p-3">{job.location}</td>
                <td className="p-3">{job.salary}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      job.status === "open"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {jobs.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No vacancies available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
