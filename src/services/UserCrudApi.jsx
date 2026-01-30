import axiosClient from "./axiosClient";

export const getAll = (config = {}) => axiosClient.get("/users", config);
export const create = (data) => axiosClient.post("/users", data);
export const update = (id, data) => axiosClient.put(`/users/${id}`, data);
export const remove = (id) => axiosClient.delete(`/users/${id}`);
