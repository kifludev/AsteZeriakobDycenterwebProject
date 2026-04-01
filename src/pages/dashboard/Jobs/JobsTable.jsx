export function JobsTable({ jobs, editJob, removeJob }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Location</th>
            <th className="p-3">Salary</th>
            <th className="p-3">Type</th>
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
              <td className="p-3">{job.type}</td>

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

              <td className="p-3 space-x-2">
                <button
                  onClick={() => editJob(job)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => removeJob(job.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
