import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <div className="text-center">
        {/* Icon cảnh báo */}
        <div className="text-red-500 text-9xl mb-4">
          <i className="fas fa-user-shield"></i> {/* Nếu bạn dùng FontAwesome */}
          <span className="font-bold">403</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Truy cập bị từ chối!
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          Bạn không có quyền hạn để xem trang này. Vui lòng liên hệ Admin nếu bạn nghĩ đây là một lỗi.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)} // Quay lại trang trước đó
            className="px-6 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-200 transition"
          >
            Quay lại
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-md"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;