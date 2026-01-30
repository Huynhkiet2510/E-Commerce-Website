import { formatUSD } from "../../../utils/formatCurrency";

const ReviewCart = ({ cart, totalPrice, handleCheckout }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Review your cart</h2>
            <div className="space-y-4">
                {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-gray-500"> {item.quantity} × {formatUSD(item.price)} </p>
                        </div>
                        <p className="font-semibold"> {formatUSD(item.price * item.quantity)} </p>
                    </div>
                ))}
                <div className="border-t my-4"></div>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatUSD(totalPrice)}</span>
                    </div>
                </div>
            </div>
            <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
                Pay Now
            </button>
        </div>
    )
}

export default ReviewCart