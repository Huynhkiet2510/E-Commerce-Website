import { useDispatch } from "react-redux";
import { addToCart } from "../../../stores/cartSlice";
import { formatUSD } from "../../../utils/formatCurrency";

const MainContent = ({ activeImg, setActiveImg, product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <div className="border rounded-2xl overflow-hidden shadow-sm bg-white">
                    <img
                        src={activeImg}
                        alt={product.title}
                        onError={(e) => {
                            e.target.src = "https://placehold.co/400x400?text=Image+Not+Found";
                        }}
                        className="w-full h-[480px] object-cover"
                    />
                </div>

                <div className="flex gap-3 mt-4 flex-wrap">
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            onClick={() => setActiveImg(img)}
                            className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition
                  ${activeImg === img
                                    ? "border-blue-500"
                                    : "border-transparent hover:border-gray-300"}
                `}
                        />
                    ))}
                </div>
            </div>
            <div className="space-y-6">
                <span className="inline-block bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
                    {product.category.name}
                </span>
                <h1 className="text-3xl font-bold text-gray-800">
                    {product.title}
                </h1>
                <p className="text-4xl font-bold text-blue-600">
                    {formatUSD(product.price)}
                </p>
                <div className="border-t pt-4">
                    <p className="text-gray-600 leading-relaxed">
                        {product.description}
                    </p>
                </div>
                <div className="pt-6 flex gap-4">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-all active:scale-95 cursor-pointer"
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>

        </div>
    )
}

export default MainContent