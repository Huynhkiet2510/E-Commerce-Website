import { Space, Button, Popconfirm, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const getCategoryColumns = (onEdit, onDelete, loading) => [
    {
        title: 'Hình ảnh',
        dataIndex: 'image',
        key: 'image',
        width: 100,
        render: (image) => (
            <Image
                src={image}
                alt="category"
                width={45}
                height={45}
                className="rounded-lg object-cover border border-gray-100"
                fallback="https://via.placeholder.com/60"
            />
        ),
    },
    {
        title: 'Tên danh mục',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render: (text) => <span className="font-medium text-blue-600">{text}</span>
    },
    {
        title: 'Thao tác',
        key: 'action',
        width: 200,
        align: 'center',
        render: (_, record) => (
            <Space size="middle">
                <Button
                    type="primary"
                    ghost
                    icon={<EditOutlined />}
                    onClick={() => onEdit(record)}
                    className="flex items-center"
                >
                    Sửa
                </Button>
                <Popconfirm
                    title="Xác nhận xóa"
                    description={`Bạn có chắc muốn xóa danh mục "${record.name}"?`}
                    onConfirm={() => onDelete(record.id)}
                    okText="Xóa"
                    cancelText="Hủy"
                    okButtonProps={{ danger: true, loading }}
                >
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        className="flex items-center"
                    >
                        Xóa
                    </Button>
                </Popconfirm>
            </Space>
        ),
    },
];