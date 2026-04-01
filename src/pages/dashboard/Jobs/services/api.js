import axios from "axios";

const BASE_URL = "http://localhost:5005/api/jobs";

export const getJobs = () => axios.get(BASE_URL);
export const createJob = (data) => axios.post(BASE_URL, data);
export const updateJob = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteJob = (id) => axios.delete(`${BASE_URL}/${id}`);
