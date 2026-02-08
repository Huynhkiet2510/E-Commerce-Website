import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../stores/cartSlice";
import { formatUSD } from "../../../utils/formatCurrency";
import { useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaPlus } from "react-icons/fa6";
import "react-lazy-load-image-component/src/effects/blur.css";

const CartProduct = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div
            key={item.id}
            onClick={() => navigate(`/product/${item.slug}`)}
            className="group bg-card-bg border border-border-customer rounded-2xl hover:border-blue-500/30 overflow-hidden shadow-md cursor-pointer hover:shadow-2xl transition-all duration-300 flex flex-col"
        >
            <div className="relative overflow-hidden h-56">
                <LazyLoadImage
                    src={item.images?.[0]}
                    alt={item.title}
                    effect="blur"
                    threshold={300}
                    wrapperClassName="w-full h-full block"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = "https://placehold.co/400x400?text=Image+Not+Found";
                    }}
                />
            </div>

            <div className="p-4 flex flex-col flex-1 space-y-2">
                <p className="text-text-muted text-[11px] font-bold uppercase mb-1">{item.category?.name}</p>
                <h3 className="text-text-main text-sm font-semibold line-clamp-2 min-h-[40px]">
                    {item.title}
                </h3>

                <div className="flex items-center justify-between ">
                    <span className="text-text-main font-extrabold text-base min-[400px]:text-lg">
                        {formatUSD(item.price)}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addToCart(item));
                        }}
                        aria-label="Add to cart"
                        className="flex items-center justify-center w-8 h-8 min-[400px]:w-10 min-[400px]:h-10 rounded-full border border-color-border text-text-main 
                                 hover:bg-text-main hover:text-page-bg
                                   active:scale-90 transition-all duration-300 shadow-sm cursor-pointer"
                    >
                        <FaPlus className="text-xs min-[400px]:text-sm" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartProduct;