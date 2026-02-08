import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.newOrder) {
    navigate("/");
    return null;
  }

  const { newOrder } = state;

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center">
        <CheckCircle className="mx-auto text-green-500" size={64} />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Đặt hàng thành công!
        </h1>

        <p className="text-gray-500 mt-1">
          Cảm ơn bạn đã mua sắm cùng chúng tôi 🎉
        </p>

        <div className="mt-6 bg-gray-50 rounded-xl p-4 text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Mã đơn hàng</span>
            <span className="font-semibold">#{newOrder.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Tổng tiền</span>
            <span className="font-bold text-green-600">
              {newOrder.total}$
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            🛍️ Tiếp tục mua sắm
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            📦 Xem đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
