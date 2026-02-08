import { X, Plus, Minus, Trash2, ShoppingCart, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart, decreaseQuantity, increaseQuantity } from '../../stores/cartSlice'
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose }) => {
    const cart = useSelector(state => state.cart.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpen) {

            document.body.style.overflow = 'hidden';
        } else {

            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const totalCart = cart.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    const formattedTotal = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(totalCart);


    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 z-[99] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={onClose}
            ></div>

            <div
                className={`
                    fixed top-0 right-0 w-full md:w-[400px] h-full bg-card-bg shadow-xl z-[100]
                    flex flex-col /* Sử dụng Flexbox để quản lý chiều cao */
                    transform transition-transform ease-in-out duration-500
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <div className="flex justify-between items-center p-4 border-b shrink-0">
                    <h2 className="text-xl font-semibold flex items-center gap-2"><span><ShoppingCart /> </span>Giỏ Hàng Của Bạn</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {cart.length > 0 ? (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center pb-2 border-b last:border-b-0"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-16 h-16 shrink-0">
                                            <img
                                                src={item.images?.[0] || `https://picsum.photos/200/300?random=${item.id}`}
                                                alt={item.title}
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                        <div className='space-y-1'>
                                            <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                                            <p className="text-xs">
                                                {item.quantity} x {item.price}$
                                            </p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <button
                                                    onClick={() => dispatch(decreaseQuantity(item.id))}
                                                    className="w-7 h-7 flex items-center justify-center rounded border hover:bg-gray-100"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-sm w-6 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => dispatch(increaseQuantity(item.id))}
                                                    className="w-7 h-7 flex items-center justify-center rounded border hover:bg-gray-100"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="text-red-500 hover:text-red-700 p-2"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2">
                            <span><ShoppingBag size={32} /></span>
                            <p>Giỏ hàng trống.</p>
                        </div>
                    )}
                </div>

                {/* 3. Footer Sidebar - Cố định ở đáy */}
                <div className='p-4 border-t bg-card-bg shrink-0'>
                    <h3 className='font-bold text-center pb-3 text-lg'>
                        Tổng giá trị: <span className="text-indigo-600">{formattedTotal}</span>
                    </h3>
                    <div className="space-y-2">
                        <button
                            disabled={!cart.length}
                            onClick={() => {
                                onClose();
                                navigate("/checkout");
                            }}
                            className={`w-full py-3 rounded-lg font-semibold shadow-md transition cursor-pointer
                                    ${!cart.length
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                                }`}
                        >
                            Thanh Toán
                        </button>

                        <button
                            onClick={() => dispatch(clearCart())}
                            className="w-full bg-white border border-gray-300 text-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-150 cursor-pointer">
                            Xóa Giỏ Hàng
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartSidebar;