import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../stores/cartSlice";
import { formatUSD } from "../../../utils/formatCurrency";
import { useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CartProduct = ({ item }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div key={item.id}
            onClick={() => navigate(`/product/${item.slug}`)}
            className="group bg-white border border-transparent hover:border-blue-100 rounded-2xl overflow-hidden shadow-md cursor-pointer hover:shadow-2xl transition-all duration-300 flex flex-col"
        >
            <div className="relative overflow-hidden h-56 bg-gray-200">
                <LazyLoadImage
                    src={item.images?.[0]}
                    alt={item.title}
                    effect="blur"
                    threshold={300}
                    wrapperClassName="w-full h-full block"
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        e.target.src = "https://placehold.co/400x400?text=Image+Not+Found";
                    }}
                />
            </div>

            <div className="p-4 flex flex-col flex-1">
                <p className="text-gray-500 text-[11px] font-bold uppercase mb-1">{item.category?.name}</p>
                <h3 className="text-gray-800 text-sm font-semibold mb-2 line-clamp-2 h-10">
                    {item.title}
                </h3>

                <div className="flex items-center justify-between gap-1 mt-auto">
                    <span className="text-blue-600 font-bold text-sm min-[400px]:text-lg">
                        {formatUSD(item.price)}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addToCart(item));
                        }}
                        className="text-[10px] min-[400px]:text-sm px-2 min-[400px]:px-3 py-1 border rounded-full text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition cursor-pointer whitespace-nowrap"
                    >
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartProduct