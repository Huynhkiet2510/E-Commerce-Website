import { Modal, Form, Input, Space, Upload } from 'antd';
import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useUploadImage } from "../../../hookcustom/useUploadImage"


const CategoryModal = ({ open, onSave, onCancel, form, indexEdit, loading }) => {
    const { fileList, beforeUpload, handleUpload, handleChange, syncImage } = useUploadImage(form, 'image', false);

    useEffect(() => {
        if (open) {
            const currentAvatar = form.getFieldValue('image');
            syncImage(currentAvatar);
        }
    }, [open, form]);

    return (
        <Modal
            title={
                <Space>
                    <AppstoreOutlined />
                    {indexEdit ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
                </Space>
            }
            open={open}
            onOk={onSave}
            onCancel={onCancel}
            okText="Lưu lại"
            cancelText="Hủy"
            centered
            maskClosable={false}
            confirmLoading={loading}
            destroyOnHidden
        >
            <Form
                form={form}
                layout="vertical"
                className="mt-5"
            >
                <Form.Item
                    name="name"
                    label="Tên danh mục"
                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                >
                    <Input placeholder="Ví dụ: Điện tử, Thời trang..." />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Hình ảnh sản phẩm"
                    rules={[{ required: true, message: 'Vui lòng upload ít nhất 1 ảnh!' }]}
                >
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        customRequest={handleUpload}
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                        maxCount={1}
                    >
                        {fileList.length < 1 && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CategoryModal