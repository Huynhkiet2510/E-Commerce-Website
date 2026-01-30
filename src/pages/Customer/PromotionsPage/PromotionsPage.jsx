import React, { useState } from "react";

const PromotionsPage = () => {

    const MOCK_PROMOTIONS = [
        {
            id: 101,
            title: "Sản phẩm khuyến mãi 1",
            price: 35,
            oldPrice: 50,
            images: ["https://i.imgur.com/keVCVIa.jpeg"],
            category: { name: "Electronics" },
            endsIn: "2026-02-01T00:00:00"
        },
        {
            id: 102,
            title: "Sản phẩm giảm giá sâu",
            price: 120,
            oldPrice: 200,
            images: ["https://i.imgur.com/ZANVnHE.jpeg"],
            category: { name: "Appliances" },
            endsIn: "2026-01-20T00:00:00"
        },
        // Thêm các sản phẩm khác...
    ];
    const [items, setItems] = useState(MOCK_PROMOTIONS);


    const calculateDiscount = (price, oldPrice) => {
        return Math.round(((oldPrice - price) / oldPrice) * 100);
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Banner Khuyến mãi */}
            <div className="bg-red-600 text-white py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-widest">
                        Flash Sale Cuối Năm!
                    </h1>
                    <p className="text-xl opacity-90">Giảm giá lên đến 70% cho tất cả các mặt hàng</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition relative group">

                            {/* Badge Giảm giá */}
                            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                                -{calculateDiscount(product.price, product.oldPrice)}%
                            </div>

                            {/* Hình ảnh */}
                            <div className="h-56 overflow-hidden">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                            </div>

                            {/* Nội dung */}
                            <div className="p-4">
                                <span className="text-xs text-gray-400 uppercase font-semibold">{product.category.name}</span>
                                <h3 className="font-bold text-gray-800 mt-1 line-clamp-2 h-12">
                                    {product.title}
                                </h3>

                                <div className="flex items-end gap-2 mt-4">
                                    <span className="text-2xl font-bold text-red-600">${product.price}</span>
                                    <span className="text-sm text-gray-400 line-through mb-1">${product.oldPrice}</span>
                                </div>

                                {/* Progress Bar (Giả lập số lượng còn lại) */}
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-500">Đã bán: 85%</span>
                                        <span className="text-red-500 font-bold">Sắp cháy hàng</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                        <div className="bg-red-500 h-full w-[85%]"></div>
                                    </div>
                                </div>

                                <button className="w-full mt-6 bg-red-600 text-white py-2 rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-200">
                                    MUA NGAY
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromotionsPage;