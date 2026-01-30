import { Trash2, ClipboardList } from "lucide-react";

const OrderHistory = ({ orders, onClearAll, onRemove }) => {
    return (
        <div className="col-span-12 lg:col-span-9 bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Lịch sử đơn hàng</h2>
                {orders.length > 0 && (
                    <button
                        onClick={onClearAll}
                        className="text-red-500 hover:underline text-sm font-medium"
                    >
                        Xóa tất cả
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <div
                            key={order?.id}
                            className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition cursor-pointer"
                        >
                            <div>
                                <p className="font-semibold text-blue-600">Đơn hàng #{order?.id}</p>
                                <p className="text-gray-500 text-sm">Ngày: {order?.date}</p>
                                <p className="text-gray-700 mt-1 font-medium">Tổng tiền: {order?.total}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => onRemove(order?.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                                    title="Xóa đơn hàng"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <span className="text-blue-600 text-sm font-semibold hover:underline cursor-pointer">
                                    Xem chi tiết →
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2">
                        <span><ClipboardList size={32} /></span>
                        <p className="italic">Bạn chưa có đơn hàng nào trong lịch sử.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderHistory