import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import axios from "axios";

export function Applications() {
  const [applications, setApplications] = useState([]);

  // 🔹 Fetch applications

  const fetchApplications = () => {
    axios
      .get("http://localhost:5005/api/applications")
      .then((res) => setApplications(res.data.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // 🗑️ DELETE APPLICATION
  const deleteApplication = (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;

    axios
      .delete(`http://localhost:5005/api/applications/${id}`)
      .then(() => fetchApplications())
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">📄 Job Applications</h2>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          {/* HEADER */}
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Job</th>
              <th className="p-3">Applied</th>
              <th className="p-3">CV</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-t">
                <td className="p-3">{app.name}</td>
                <td className="p-3">{app.email}</td>
                <td className="p-3">{app.phone}</td>
                <td className="p-3">{app.job_title}</td>

                {/* DATE */}
                <td className="p-3">
                  {app.date_applied
                    ? new Date(app.date_applied).toLocaleDateString()
                    : "No date"}
                </td>

                {/* CV */}
                <td className="p-3">
                  <a
                    href={`http://localhost:5005/api/applications/download/${app.cv_file.replace("/uploads/", "")}`}
                    className="text-blue-600 hover:text-blue-800 text-xl"
                    title="Download CV"
                  >
                    <FaDownload />
                  </a>
                </td>

                {/* ACTIONS */}
                <td className="p-3 space-x-2">
                  {/* 📧 Gmail Link */}
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${app.email}&su=Job Application Update`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 text-white px-3 py-1 rounded inline-block cursor-pointer"
                    title="SentEmail"
                  >
                    SentGmail
                  </a>

                  {/* 🗑️ Delete Button */}
                  <button
                    onClick={() => deleteApplication(app.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                    title="DeleteApplication"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* EMPTY STATE */}
            {applications.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
