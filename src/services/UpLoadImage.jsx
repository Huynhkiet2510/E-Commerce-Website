import axiosClient from "./axiosClient";

export const postUploadImage = (formData) => axiosClient.post("/files/upload", formData);