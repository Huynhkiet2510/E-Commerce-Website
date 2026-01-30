import React from 'react';
import { Table, Button, Card, Typography, ConfigProvider, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useProductActions } from './useProductActions';
import ProductModal from './ProductModal';
import { getProductColumns } from './ProductColumns';

const { Title, Text } = Typography;

const ProductManagement = () => {
  const {
    products, loading, error, isModalOpen, form, indexEdit,
    handleSave, prepareEdit, prepareAdd, handleDelete, handleCancel
  } = useProductActions();

  const columns = getProductColumns(prepareEdit, handleDelete, loading);

  if (error) return <Alert message="Lỗi" type="error" showIcon />;

  return (
    <ConfigProvider theme={{ token: { borderRadius: 8 } }}>
      <div className="flex min-h-screen bg-[#f0f2f5]">
        <div className="flex-1 p-5 overflow-x-auto">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <Title level={2}>Quản lý sản phẩm</Title>
              <Text type="secondary">Quản lý kho hàng và thông tin sản phẩm</Text>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={prepareAdd}
              className="shadow-[0_4px_10px_rgba(22,119,255,0.2)]"
            >
              Thêm mới sản phẩm
            </Button>
          </div>
          <Card className="shadow-[0_4px_20px_rgba(0,0,0,0.05)] min-h-[590px] flex flex-col">
            {error && (
              <div className="p-4 text-[#ff4d4f] bg-[#fff2f0] flex items-center gap-2">
                {error}
              </div>
            )}
            <Table
              dataSource={products}
              columns={columns}
              rowKey="id"
              loading={loading}
              className="flex-1"
              pagination={{
                pageSize: 5,
                showTotal: (total) => `Tổng cộng ${total} danh mục`
              }}
            />
          </Card>

          <ProductModal
            open={isModalOpen}
            onSave={handleSave}
            onCancel={handleCancel}
            form={form}
            indexEdit={indexEdit}
            loading={loading}
          />
        </div>
      </div>
    </ConfigProvider >
  );
};

export default ProductManagement;