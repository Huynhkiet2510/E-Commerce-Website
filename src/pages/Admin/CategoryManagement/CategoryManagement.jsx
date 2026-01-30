import { useCategoryAction } from "./useCategoryAction";
import { Table, Button, Card, Typography, ConfigProvider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { getCategoryColumns } from "./CategoryColumns"
import CategoryModal from "./CategoryModal";

const CategoryManagement = () => {
  const {
    categories, loading, error, isModalOpen, form, indexEdit,
    handleSave, prepareEdit, prepareAdd, handleDelete, handleCancel
  } = useCategoryAction();

  const { Title, Text } = Typography;

  const columns = getCategoryColumns(prepareEdit, handleDelete, loading)


  return (
    <ConfigProvider theme={{ token: { borderRadius: 8 } }}>
      <div className="flex min-h-screen bg-[#f0f2f5]">
        <div className="flex-1 p-5 overflow-x-auto">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <Title level={2}>Quản lý danh mục</Title>
              <Text type="secondary">Phân loại sản phẩm hệ thống</Text>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={prepareAdd}
              className="shadow-[0_4px_10px_rgba(22,119,255,0.2)]"
            >
              Thêm danh mục
            </Button>
          </div>

          <Card className="shadow-[0_4px_20px_rgba(0,0,0,0.05)] min-h-[590px] flex flex-col">
            {error && (
              <div className="p-4 text-[#ff4d4f] bg-[#fff2f0] flex items-center gap-2">
                {error}
              </div>
            )}

            <Table
              dataSource={categories}
              columns={columns}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 5,
                showTotal: (total) => `Tổng cộng ${total} danh mục`,
              }}
            />
          </Card>



          <CategoryModal
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

export default CategoryManagement;