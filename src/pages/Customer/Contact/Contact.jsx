import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className=" mb-8">
            Nếu bạn có câu hỏi về đơn hàng, sản phẩm hoặc hợp tác,
            đừng ngần ngại liên hệ với chúng tôi.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Phone className="text-indigo-600" />
              <span >0123 456 789</span>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-indigo-600" />
              <span >support@shop.com</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-indigo-600" />
              <span >
                123 Đường ABC, Quận 1, TP.HCM
              </span>
            </div>
          </div>
        </div>
        <div className="bg-card-bg rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-semibold mb-6">
            Gửi tin nhắn cho chúng tôi
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium  mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div>
              <label className="block text-sm font-medium  mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium  mb-1">
                Nội dung
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Nhập nội dung liên hệ..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Gửi liên hệ
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
