import { Space, Button, Tag, Popconfirm, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, MailOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const getUserColumns = (onEdit, onDelete, loading) => [
    {
        title: 'Người dùng',
        key: 'user',
        width: 300,
        render: (_, record) => (
            <div className="flex flex-col">
                <span className="text-blue-500 font-semibold text-md leading-tight">
                    {record.name}
                </span>
                <span className="text-gray-400 text-sm flex items-center gap-1">
                    <MailOutlined /> {record.email}
                </span>
            </div>
        ),
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
        width: 120,
        align: 'center', 
        render: (role) => {
            const color = role === 'admin' ? 'volcano' : role === 'customer' ? 'green' : 'geekblue';
            return (
                <Tag color={color} className="rounded px-2 font-semibold uppercase text-[10px]">
                    {role}
                </Tag>
            );
        },
    },
    {
        title: 'Mật khẩu',
        dataIndex: 'password',
        key: 'password',
        width: 120,
        render: () => <Text className="text-gray-400 italic">********</Text>
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
                    description={`Bạn có chắc muốn xóa user "${record.email}"?`}
                    onConfirm={() => onDelete(record.id)}
                    okText="Xóa"
                    cancelText="Hủy"
                    okButtonProps={{ danger: true, loading }}
                >
                    <Button danger icon={<DeleteOutlined />} className="flex items-center">
                        Xóa
                    </Button>
                </Popconfirm>
            </Space>
        ),
    },
];