import { useUserAction } from "./useUserAction";
import { Table, Button, Card, Typography, ConfigProvider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UserModal from "./UserModal"
import { getUserColumns } from "./UserColumns";


const { Title, Text } = Typography;

const UserManagement = () => {
  const {
    users, loading, error, isModalOpen, form, indexEdit,
    handleSave, prepareEdit, prepareAdd, handleDelete, handleCancel
  } = useUserAction();

  const columns = getUserColumns(prepareEdit, handleDelete, loading)

  return (
    <ConfigProvider theme={{ token: { borderRadius: 8 } }}>
      <div className="flex min-h-screen bg-[#f0f2f5]">
        <div className="flex-1 p-5 overflow-x-auto">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <Title level={2}>Quản lý người dùng</Title>
              <Text type="secondary">Hệ thống quản lý thông tin thành viên</Text>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={prepareAdd}
              className="shadow-[0_4px_10px_rgba(22,119,255,0.2)]"
            >
              Thêm mới người dùng
            </Button>
          </div>

          <Card className="shadow-[0_4px_20px_rgba(0,0,0,0.05)] min-h-[590px] flex flex-col">
            {error && (
              <div className="p-4 text-[#ff4d4f] bg-[#fff2f0] border-b border-[#ffccc7]">
                {error}
              </div>
            )}

            <Table
              dataSource={users}
              columns={columns}
              rowKey="id"
              loading={loading}
              
              pagination={{
                pageSize: 6,
                showTotal: (total) => `Tổng cộng ${total} người dùng`,               
              }}
              
            />
          </Card>
          <UserModal
            open={isModalOpen}
            onSave={handleSave}
            onCancel={handleCancel}
            form={form}
            indexEdit={indexEdit}
            loading={loading}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default UserManagement;