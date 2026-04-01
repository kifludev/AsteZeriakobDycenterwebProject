// import { useEffect, useState } from "react";
// import axios from "axios";

// export function Jobs() {
//   const [jobs, setJobs] = useState([]);

//   const [form, setForm] = useState({
//     title: "",
//     location: "",
//     salary: "",
//     type: "Full-Time",
//     description: "",
//     status: "open",
//   });

//   const [editingId, setEditingId] = useState(null); // 🔥 important

//   // 🔹 Fetch jobs
//   const fetchJobs = () => {
//     axios.get("http://localhost:5000/api/jobs").then((res) => {
//       setJobs(res.data);
//     });
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   // 🔹 Handle input
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // 🔹 Submit (Add OR Update)
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editingId) {
//       // ✅ UPDATE
//       axios
//         .put(`http://localhost:5000/api/jobs/${editingId}`, form)
//         .then(() => {
//           resetForm();
//           fetchJobs();
//         });
//     } else {
//       // ✅ CREATE
//       axios.post("http://localhost:5000/api/jobs", form).then(() => {
//         resetForm();
//         fetchJobs();
//       });
//     }
//   };

//   // 🔹 Edit job
//   const editJob = (job) => {
//     setForm({
//       title: job.title,
//       location: job.location,
//       salary: job.salary,
//       type: job.type,
//       description: job.description,
//       status: job.status,
//     });

//     setEditingId(job.id); // 🔥 switch to edit mode
//   };

//   // 🔹 Delete job
//   const deleteJob = (id) => {
//     axios.delete(`http://localhost:5000/api/jobs/${id}`).then(() => {
//       fetchJobs();
//     });
//   };

//   // 🔹 Reset form
//   const resetForm = () => {
//     setForm({
//       title: "",
//       location: "",
//       salary: "",
//       type: "Full-Time",
//       description: "",
//       status: "open",
//     });
//     setEditingId(null);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-6">💼 Vacancy Management</h2>

//       {/* 🔹 FORM */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
//       >
//         <textarea
//           name="title"
//           placeholder="Job Title"
//           value={form.title}
//           onChange={handleChange}
//           rows={2}
//           className="border p-2 rounded md:col-span-4"
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Job Description"
//           value={form.description}
//           onChange={handleChange}
//           rows={3}
//           className="border p-2 rounded md:col-span-4"
//           required
//         />

//         <input
//           name="location"
//           placeholder="Location"
//           value={form.location}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />

//         <input
//           name="salary"
//           placeholder="Salary"
//           value={form.salary}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />

//         <select
//           name="type"
//           value={form.type}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         >
//           <option>Full-Time</option>
//           <option>Part-Time</option>
//           <option>Contract</option>
//         </select>

//         <select
//           name="status"
//           value={form.status}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         >
//           <option value="open">Open</option>
//           <option value="closed">Closed</option>
//         </select>

//         {/* 🔥 Button changes */}
//         <button
//           type="submit"
//           className={`text-white rounded p-2 md:col-span-4 ${
//             editingId ? "bg-yellow-500" : "bg-blue-600"
//           }`}
//         >
//           {editingId ? "✏️ Update Job" : "➕ Add Job"}
//         </button>
//       </form>

//       {/* 🔹 TABLE */}
//       <div className="bg-white rounded-lg shadow overflow-x-auto">
//         <table className="w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3">Title</th>
//               <th className="p-3">Location</th>
//               <th className="p-3">Salary</th>
//               <th className="p-3">Type</th>
//               <th className="p-3">Description</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job.id} className="border-t">
//                 <td className="p-3">{job.title}</td>
//                 <td className="p-3">{job.location}</td>
//                 <td className="p-3">{job.salary}</td>
//                 <td className="p-3">{job.type}</td>
//                 <td className="p-3 truncate max-w-xs">{job.description}</td>

//                 <td className="p-3">
//                   <span
//                     className={`px-2 py-1 rounded text-sm ${
//                       job.status === "open"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {job.status}
//                   </span>
//                 </td>

//                 <td className="p-3 space-x-2">
//                   {/* 🔥 EDIT BUTTON */}
//                   <button
//                     onClick={() => editJob(job)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => deleteJob(job.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {jobs.length === 0 && (
//               <tr>
//                 <td colSpan="7" className="text-center p-4 text-gray-500">
//                   No vacancies available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
