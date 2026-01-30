// 1. Lấy danh sách đơn hàng: Luôn đảm bảo trả về Mảng []
export const getOrders = () => {
  try {
    const data = localStorage.getItem("orders");
    // Nếu data là null, undefined hoặc chuỗi rỗng thì trả về mảng []
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Lỗi khi parse dữ liệu từ LocalStorage:", error);
    return []; // Trả về mảng rỗng để các hàm .map() không bị crash
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
  return updatedOrders; // Trả về để UI cập nhật lại state
};

// 4. Xóa sạch mọi đơn hàng
export const clearAllOrders = () => localStorage.removeItem("orders");