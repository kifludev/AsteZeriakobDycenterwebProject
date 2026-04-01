import axios from "axios";

export const getJobsAPI = () => {
  return axios.get("http://localhost:5000/api/jobs");
};

export const submitApplicationAPI = (formData) => {
  return axios.post("http://localhost:5000/api/applications", formData);
};
