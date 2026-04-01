import { useState, useEffect } from "react";
import { FooterPage } from "../../components/FooterPage";
import { JobCard } from "../dashboard/Jobs/JobCard";
import { ApplyModal } from "./ApplyModal";
import { getJobsAPI, submitApplicationAPI } from "./services/api";

export function VacancyPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    cv: null,
  });

  // 🔹 Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobsAPI();
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 🔹 Open modal
  const handleApply = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  // 🔹 Form handlers
  const handleChange = (e) => {
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setApplicant({ ...applicant, cv: e.target.files[0] });
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, coverLetter, cv } = applicant;

    if (!name || !email || !phone || !coverLetter || !cv) {
      alert("All fields required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("coverLetter", coverLetter);
      formData.append("cv", cv);
      formData.append("job_id", selectedJob.id);

      await submitApplicationAPI(formData);

      alert("Application submitted!");
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <section className="bg-[#740305] text-white py-12 text-center w-full">
        <h1 className="text-4xl font-bold">Vacancies</h1>
        <p className="mt-2 text-lg">
          Join Atse Zeriakop Youth Center and make an impact in the community
        </p>
      </section>
      <div className="pt-4 px-4 md:px-8 max-w-7xl ">
        <title>Vacancies | Atse Zeriakop Youth Center</title>

        {/* 🔹 Loading */}
        {loading && (
          <div className="text-center mt-10">
            <p>Loading jobs...</p>
          </div>
        )}

        {/* 🔹 No jobs */}
        {!loading && jobs.length === 0 && (
          <p className="text-center text-gray-500">No jobs available</p>
        )}

        {/* 🔥 RESPONSIVE GRID */}
        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 items-stretch">
            {jobs.map((job) => (
              <div key={job.id} className="h-full">
                <JobCard job={job} onApply={handleApply} />
              </div>
            ))}
          </div>
        )}

        {/* 🔹 Modal */}
        <ApplyModal
          show={showForm}
          job={selectedJob}
          onClose={() => setShowForm(false)}
          form={applicant}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
        />
      </div>
      <FooterPage />
    </div>
  );
}
