import { useEffect, useState, useCallback } from "react";
import { getAll, remove, create, update } from "../../../services/CategoryCrudApi";
import { Form } from "antd";
import axios from "axios";

export const useCategoryAction = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indexEdit, setIndexEdit] = useState(null);
  const [form] = Form.useForm();

  /* ================= FETCH ================= */
  const fetchCategories = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAll({ signal });
      setCategories(res.data);
    } catch (err) {
      if (axios.isCancel(err)) return;
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchCategories(controller.signal);
    return () => controller.abort();
  }, [fetchCategories]);

  /* ================= MODAL ================= */
  const handleCancel = () => {
    form.resetFields();
    setIndexEdit(null);
    setIsModalOpen(false);
  };

  const prepareEdit = (record) => {
    setIndexEdit(record.id);
    setIsModalOpen(true);
    form.setFieldsValue(record);
  };

  const prepareAdd = () => {
    setIndexEdit(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  /* ================= SAVE (ADD / EDIT) ================= */
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      setError(null);
      if (indexEdit) {
        // EDIT
        const res = await update(indexEdit, values);
        const updatedCategory = res.data
        setCategories(prev => prev.map(item => item.id === indexEdit ? updatedCategory : item))
      } else {
        // ADD
        const res = await create(values);
        const newCategory = res.data
        setCategories(prev => [...prev, newCategory])
      }

      handleCancel();
    } catch (err) {
      if (err.errorFields) return;
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await remove(id);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    isModalOpen,
    setIsModalOpen,
    form,
    indexEdit, setIndexEdit,
    handleSave,
    handleDelete,
    handleCancel,
    prepareEdit,
    prepareAdd,
  };
};
