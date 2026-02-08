import { Facebook, Instagram, X, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    <div>
                        <h2 className="text-white text-xl font-bold mb-4">GEMINI SHOP</h2>
                        <p className="text-sm leading-6 mb-4">
                            Chuyên cung cấp các sản phẩm công nghệ chính hãng với mức giá cạnh tranh nhất thị trường.
                        </p>
                        <div className="flex space-x-4">
                            <Facebook className="hover:text-blue-500 cursor-pointer" size={20} />
                            <Instagram className="hover:text-pink-500 cursor-pointer" size={20} />
                            <X className="hover:text-white cursor-pointer" size={20} />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">HỖ TRỢ</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition">Trung tâm trợ giúp</a></li>
                            <li><a href="#" className="hover:text-white transition">Chính sách bảo hành</a></li>
                            <li><a href="#" className="hover:text-white transition">Vận chuyển & Giao hàng</a></li>
                            <li><a href="#" className="hover:text-white transition">Hoàn tiền & Trả hàng</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">LIÊN HỆ</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <MapPin size={16} /> 123 Đường ABC, Quận 12, TP.HCM
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} /> 0949732710
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} /> huynhtuankiet@gemini.com
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">BẢN TIN</h4>
                        <p className="text-sm mb-4">Đăng ký để nhận ưu đãi mới nhất từ chúng tôi.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="bg-gray-800 text-white px-3 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition">
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-800 mb-6" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs">
                        © 2026 Gemini E-commerce. Powered by React.
                    </p>
                    <div className="flex gap-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 bg-white px-1 rounded" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 bg-white px-1 rounded" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-6 bg-white px-1 rounded" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;