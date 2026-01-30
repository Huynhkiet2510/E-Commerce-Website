import { useEffect, useState } from 'react'
import { getAll, create, update, remove } from "../../../services/UserCrudApi";
import { Form, message } from "antd";
import axios from 'axios';

export const useUserAction = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [indexEdit, setIndexEdit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    /* ================= FETCH ================= */
    useEffect(() => {
        const controller = new AbortController();
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await getAll({ signal: controller.signal })
                setUsers(res.data);
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
        return () => controller.abort();
    }, []);


    /* ================= Add and Edit ================= */
    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            setError(null);
            const payload = {
                ...values,
                avatar: Array.isArray(values.avatar)
                    ? values.avatar[0]
                    : (values.avatar || "https://i.imgur.com/LDOOq1g.jpg")
            };

            if (indexEdit) {

                if (!payload.password) delete payload.password;
                const res = await update(indexEdit, payload);
                setUsers(prev => prev.map(item => item.id === indexEdit ? res.data : item));
                message.success("Cập nhật thành công");
            } else {
                const res = await create(payload);
                setUsers(prev => [...prev, res.data]);
            }
            setIsModalOpen(false);
        } catch (err) {
            if (err.errorFields) return;
            const msg = err.response?.data?.message || "Có lỗi xảy ra";
            setError(msg);
            message.error(msg);
        } finally {
            setLoading(false);
        }
    };

    /* ================= Modal ================= */
    const prepareEdit = (record) => {
        setIndexEdit(record.id);
        setIsModalOpen(true);
        const formattedData = {
            name: record?.name,
            email: record?.email,
            password: record?.password,
            role: record?.role,
            avatar: record?.avatar,
        };
        form.setFieldsValue(formattedData);
    };

    const prepareAdd = () => {
        setIndexEdit(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    /* ================= Cancel Modal ================= */
    const handleCancel = () => {

        setIsModalOpen(false);
        setIndexEdit(null);
    };

    /* ================= Delete ================= */
    const handleDelete = async (id) => {
        try {
            setLoading(true);
            setError(null);
            await remove(id);
            setUsers(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    return {
        users, loading, error, isModalOpen, form, indexEdit,
        setIsModalOpen, handleSave, prepareEdit, prepareAdd, handleDelete, handleCancel
    }
}
