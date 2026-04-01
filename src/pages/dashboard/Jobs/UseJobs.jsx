import { useEffect, useState } from "react";
import { getJobs, createJob, updateJob, deleteJob } from "./services/api";

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    type: "Full-Time",
    status: "open",
    posted_date: "",
    deadline: "",
  });

  const fetchJobs = async () => {
    const res = await getJobs();
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      title: "",
      location: "",
      salary: "",
      type: "Full-Time",
      description: "",
      status: "open",
    });
    setEditingId(null);
  };

  const submitJob = async () => {
    if (editingId) {
      await updateJob(editingId, form);
    } else {
      await createJob(form);
    }

    resetForm();
    fetchJobs();
  };

  const editJob = (job) => {
    setForm(job);
    setEditingId(job.id);
  };

  const removeJob = async (id) => {
    await deleteJob(id);
    fetchJobs();
  };

  return {
    jobs,
    form,
    editingId,
    handleChange,
    submitJob,
    editJob,
    removeJob,
  };
}
