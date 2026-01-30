import axiosClient from "./axiosClient";

export const getProducts = (params, config = {}) => {
    const cleanParams = {};
    Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
            cleanParams[key] = params[key];
        }
    });

    return axiosClient.get(`/products`, {
        ...config,
        params: cleanParams
    });
}

export const getCategories = (limit, config = {}) => {
    return axiosClient.get(`/categories`, {
        ...config,
        params: { limit }
    });
}
