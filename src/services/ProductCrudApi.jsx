import axiosClient from "./axiosClient";

export const getAll = (config = {}) => axiosClient.get("/products", config);
export const create = (data) => axiosClient.post("/products", data,);
export const update = (id, data) => axiosClient.put(`/products/${id}`, data);
export const remove = (id) => axiosClient.delete(`/products/${id}`);
