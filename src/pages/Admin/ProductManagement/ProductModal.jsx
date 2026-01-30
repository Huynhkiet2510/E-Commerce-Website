
import { Modal, Form, Input, InputNumber, Space, Upload } from 'antd';
import { ShoppingOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useUploadImage } from "../../../hookcustom/useUploadImage"

const ProductModal = ({ open, onSave, onCancel, form, indexEdit, loading }) => {
    const { fileList, handleUpload, handleChange, syncImage } = useUploadImage(form, 'images', true);

    useEffect(() => {
        if (open) {
            const currentAvatar = form.getFieldValue('images');
            syncImage(currentAvatar);
        }
    }, [open, form]);

    return (
        <Modal
            title={
                <Space>
                    {indexEdit ? <EditOutlined className="text-blue-500" /> : <ShoppingOutlined className="text-green-500" />}
                    <span className="font-semibold">
                        {indexEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                    </span>
                </Space>
            }
            open={open}
            onOk={onSave}
            onCancel={onCancel}
            okText="Lưu lại"
            cancelText="Hủy"
            centered
            width={700}
            maskClosable={false}
            confirmLoading={loading}
            destroyOnHidden
        >
            <Form
                form={form}
                layout="vertical"
                className="mt-6"
            >
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">

                    <Form.Item
                        name="title"
                        label="Tên sản phẩm"
                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                    >
                        <Input
                            placeholder="Ví dụ: iPhone 15 Pro"
                            prefix={<ShoppingOutlined className="text-gray-300" />}
                            className="h-[40px]"
                        />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Giá sản phẩm ($)"
                        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                    >
                        <InputNumber
                            className="!w-full h-[40px] flex items-center"
                            min={0}
                            placeholder="99.99"
                            prefix={<span className="text-gray-400">$</span>}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="categoryId"
                        label="ID Danh mục"
                        rules={[{ required: true, message: 'Vui lòng nhập ID danh mục!' }]}
                    >
                        <InputNumber
                            className="!w-full h-[40px] flex items-center"
                            placeholder="1, 2, 3..."
                        />
                    </Form.Item>
                    <Form.Item
                        name="images"
                        label="Hình ảnh sản phẩm"
                        rules={[{ required: true, message: 'Vui lòng upload ít nhất 1 ảnh!' }]}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            customRequest={handleUpload} // Dùng hàm axios mình viết
                            onChange={handleChange}
                            maxCount={3} // Tùy chọn giới hạn số lượng ảnh
                        >
                            {fileList.length < 3 && (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                </div>


                <Form.Item
                    name="description"
                    label="Mô tả sản phẩm"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    className="mt-2"
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Nhập chi tiết về thông số, màu sắc, bảo hành..."
                        showCount
                        maxLength={500}
                        className="rounded-lg"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProductModal;