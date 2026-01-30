import axiosClient from "./axiosClient";

export const getAll = (config = {}) => axiosClient.get("/categories", config);
export const create = (data) => axiosClient.post("/categories", data);
export const update = (id, data) => axiosClient.put(`/categories/${id}`, data);
export const remove = (id) => axiosClient.delete(`/categories/${id}`); 
