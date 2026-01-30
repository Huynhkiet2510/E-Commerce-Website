import axiosClient from "./axiosClient";

export const getProductDetail = (slug, config = {}) => axiosClient.get(`/products/slug/${slug}`, config)

