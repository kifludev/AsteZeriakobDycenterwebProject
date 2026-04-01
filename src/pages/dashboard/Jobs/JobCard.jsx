import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

export function JobCard({ job, onApply }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col h-full hover:shadow-lg transition hover:scale-[1.02]">
      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>

      <div className="flex items-center text-gray-500 text-sm mb-2">
        <FaMapMarkerAlt className="mr-2 text-red-600" />
        {job.location}
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {job.description}
      </p>

      <div className="text-sm text-gray-500 space-y-1">
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2 text-blue-500" />
          Posted: {new Date(job.posted_date).toLocaleDateString()}
        </div>

        {job.deadline ? (
          <div className="flex items-center">
            <FaClock className="mr-2 text-orange-500" />
            Deadline: {new Date(job.deadline).toLocaleDateString()}
          </div>
        ) : (
          <div className="text-gray-400 italic">No deadline set</div>
        )}
      </div>

      <button
        onClick={() => onApply(job)}
        className="mt-auto bg-[#740305] text-white py-2 px-3 rounded-lg hover:opacity-90 cursor-pointer"
      >
        Apply Now
      </button>
    </div>
  );
}
