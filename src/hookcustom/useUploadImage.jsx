import { useState } from "react";
import { Upload, message } from "antd";
import { postUploadImage } from "../services/UpLoadImage";

export const useUploadImage = (form, fieldName, isMultiple = false) => {
    const [fileList, setFileList] = useState([]);

    const syncImage = (url) => {
        if (url) {
            const imageArray = Array.isArray(url) ? url : [url];
            const formattedFiles = imageArray.map((url, index) => ({
                uid: index,
                name: `image-${index}.png`,
                status: "done",
                url: url,
                thumbUrl: url,
            }));
            setFileList(formattedFiles);
        } else {
            setFileList([]);
        }
    };

    const handleUpload = async ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await postUploadImage(formData);
            onSuccess(res.data.location);
        } catch (err) {
            onError(err);
        }
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        const urls = newFileList
            .filter(file => file.status === "done")
            .map(file => file.url || file.response);

        const valueToSet = isMultiple ? urls : (urls[0] || "");
        form.setFieldsValue({ [fieldName]: valueToSet });
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp";
        if (!isJpgOrPng) {
            message.error("Bạn chỉ có thể tải lên định dạng JPG/PNG/WebP!");
            return Upload.LIST_IGNORE;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Kích thước ảnh phải nhỏ hơn 2MB!");
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    return { fileList, beforeUpload, setFileList, handleUpload, handleChange, syncImage };
};