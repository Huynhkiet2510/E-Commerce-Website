// 1. Lấy danh sách đơn hàng: Luôn đảm bảo trả về Mảng []
export const getOrders = () => {
  try {
    const data = localStorage.getItem("orders");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Lỗi khi parse dữ liệu từ LocalStorage:", error);
    return []; 
  }
};

// 2. Lưu đơn hàng mới: Tái sử dụng getOrders() để code ngắn gọn
export const saveOrder = (order) => {
  const existingOrders = getOrders();
  const updatedOrders = [...existingOrders, order];
  localStorage.setItem("orders", JSON.stringify(updatedOrders));
};

// 3. Xóa một đơn hàng theo ID
export const deleteOrderById = (orderId) => {
  const orders = getOrders();
  const updatedOrders = orders.filter(order => order.id !== orderId);
  localStorage.setItem("orders", JSON.stringify(updatedOrders));
  return updatedOrders; 
};

// 4. Xóa sạch mọi đơn hàng
export const clearAllOrders = () => localStorage.removeItem("orders");

// 5. Xem chi tiết đơn hàng
export const viewDetailOrder = (id) => {
  const rawData = localStorage.getItem("orders");
  if (!rawData) return null;
  const orders = JSON.parse(rawData);
  return orders.find(order => order.id.toString() === id.toString());
}