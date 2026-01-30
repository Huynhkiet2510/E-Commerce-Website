import { Space, Modal, Form, Input, Select, Upload } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { useUploadImage } from '../../../hookcustom/useUploadImage';
import { useEffect } from 'react';

const UserModal = ({ open, onSave, onCancel, form, indexEdit, loading }) => {
    const { fileList, handleUpload, handleChange, syncImage } = useUploadImage(form, 'avatar', false);

    useEffect(() => {
        if (open) {
            const currentAvatar = form.getFieldValue('avatar');
            syncImage(currentAvatar);
        }
    }, [open, form]);

    return (
        <Modal
            title={
                <Space>
                    <UserOutlined />
                    {indexEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
                </Space>
            }
            open={open}
            onOk={onSave}
            onCancel={onCancel}
            okText="Lưu lại"
            cancelText="Hủy"
            centered
            width={650}
            confirmLoading={loading}
            maskClosable={false}
            destroyOnHidden
        >
            <Form
                form={form}
                layout="vertical"
                className="mt-5"
                initialValues={{ role: 'customer' }}
            >
                <div className="grid grid-cols-2 gap-x-5">
                    <Form.Item
                        name="name"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                        <Input placeholder="Nguyễn Văn A" autoComplete="username" prefix={<UserOutlined className="text-gray-300" />} />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không đúng định dạng!' }
                        ]}
                    >
                        <Input placeholder="example@gmail.com" disabled={!!indexEdit} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: !indexEdit, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu"
                            autoComplete="new-password" />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label="Vai trò"
                        rules={[{ required: true, message: 'Chọn một vai trò!' }]}
                    >
                        <Select placeholder="Chọn vai trò">
                            <Select.Option value="admin">Quản trị viên (Admin)</Select.Option>
                            <Select.Option value="customer">Khách hàng (Customer)</Select.Option>
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item
                    name="avatar"
                    label="Ảnh đại diện"
                    rules={[{ required: true, message: 'Chọn một ảnh đại diện!' }]}
                >
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        customRequest={handleUpload}
                        onChange={handleChange}
                        referrerpolicy="no-referrer"
                        maxCount={1} // Thường avatar chỉ nên để 1
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
    );
};

export default UserModal;