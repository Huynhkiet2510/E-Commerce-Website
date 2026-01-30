import { Space, Button, Tag, Popconfirm, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const getProductColumns = (onEdit, onDelete, loading) => [
    {
        title: 'Hình ảnh',
        dataIndex: 'images',
        key: 'images',
        width: 100,
        render: (images) => (
            <Image
                src={images?.[0]}
                alt="product"
                width={45}
                height={45}
                className="rounded-lg object-cover border border-gray-100"
                onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
            />
        ),
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'title',
        key: 'title',
        width: 400,
        sorter: (a, b) => a.title.localeCompare(b.title),
        render: (text) => <span className="font-medium text-blue-600">{text}</span>
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
        key: 'category',
        width: 200,
        render: (category) => <Tag color="blue" className="px-2 py-0.5">{category?.name || 'N/A'}</Tag>,
    },
    {
        title: 'Giá tiền',
        dataIndex: 'price',
        key: 'price',
        align: 'right',
        sorter: (a, b) => a.price - b.price,
        render: (price) => (<span className="font-bold">${price?.toLocaleString()}</span>
        ),
    },
    {
        title: 'Thao tác',
        key: 'action',
        align: 'center',
        render: (_, record) => (
            <Space size="middle">
                <Button
                    type="primary"
                    ghost
                    icon={<EditOutlined />}
                    onClick={() => onEdit(record)}
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
                    <Button danger icon={<DeleteOutlined />}>
                        Xóa
                    </Button>
                </Popconfirm>
            </Space>
        ),
    },
];