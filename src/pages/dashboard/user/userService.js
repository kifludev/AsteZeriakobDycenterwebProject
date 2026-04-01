import axios from "axios";

export const getUsers = (config) =>
  axios.get(`http://localhost:5005/api/users`, config);

export const createUserAPI = (data, config) =>
  axios.post(`http://localhost:5005/api/users`, data, config);

export const deleteUserAPI = (id, config) =>
  axios.delete(`http://localhost:5005/api/users/${id}`, config);

export const changeUserRoleAPI = (id, role, config) =>
  axios.put(`http://localhost:5005/api/users/${id}/role`, { role }, config);

export const resetPasswordAPI = (id, data, config) =>
  axios.put(
    `http://localhost:5005/api/users/${id}/reset-password`,
    data,
    config,
  );
