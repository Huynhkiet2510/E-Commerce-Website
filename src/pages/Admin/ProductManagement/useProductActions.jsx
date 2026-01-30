import { useEffect, useState } from 'react';
import { getAll, create, update, remove } from "../../../services/ProductCrudApi";
import { Form } from "antd";
import axios from 'axios';

export const useProductActions = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [indexEdit, setIndexEdit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sử dụng Antd Form thay cho việc quản lý formData thủ công
    const [form] = Form.useForm();

    /* ================= 1. FETCH DỮ LIỆU ================= */
    useEffect(() => {
        const controller = new AbortController();
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await getAll({ signal: controller.signal });
                setProducts(res.data);
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        return () => controller.abort();
    }, []);

    /* ================= 2. LƯU (THÊM/SỬA) ================= */
    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            setError(null);

            const formattedValues = {
                ...values,
                images: Array.isArray(values.images) ? values.images : [values.images]
            };

            if (indexEdit) {
                const res = await update(indexEdit, formattedValues);
                const updatedProduct = res.data;
                setProducts(prev => prev.map(item => item.id === indexEdit ? updatedProduct : item)
                );
            } else {
                const res = await create(formattedValues);
                const newProduct = res.data;
                setProducts(prev => [...prev, newProduct]);
            }
            setIsModalOpen(false);
            form.resetFields();
        } catch (err) {
            if (err.errorFields) return;
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    /* ================= 3. ĐIỀU KHIỂN MODAL ================= */
    const prepareEdit = (record) => {
        setIndexEdit(record.id);
        setIsModalOpen(true);
        const formattedData = {
            title: record.title,
            price: record.price,
            description: record.description,
            categoryId: record.category.id,
            images: record.images,
        };
        form.setFieldsValue(formattedData);
    };

    const prepareAdd = () => {
        setIndexEdit(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIndexEdit(null);
        form.resetFields();
    };

    /* ================= 4. XÓA ================= */
    const handleDelete = async (id) => {
        try {
            setLoading(true);
            setError(null);
            await remove(id);
            setProducts(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        products, loading, error, isModalOpen, form, indexEdit,
        setIsModalOpen, handleSave, prepareEdit, prepareAdd, handleDelete, handleCancel
    };
};