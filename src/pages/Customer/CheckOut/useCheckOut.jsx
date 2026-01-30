import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../stores/cartSlice";
import { useNavigate } from "react-router-dom";
import { formatUSD } from "../../../utils/formatCurrency";
import { saveOrder } from "../../../utils/orderStorage";

export const useCheckOut = () => {
    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        if (cart.length === 0) return alert("Giỏ hàng trống!");

        if (!formData.fullName || !formData.email || !formData.phone) {
            return alert("Vui lòng điền các thông tin bắt buộc (*)");
        }

        const newOrder = {
            id: Date.now(),
            customer: formData,
            items: cart,
            date: new Date().toLocaleString(),
            total: formatUSD(totalPrice)
        };
        saveOrder(newOrder);
        dispatch(clearCart());
        navigate("/ordersuccessfully", { state: { newOrder } });
    };

    return {
        handleCheckout, handleChange, cart, formData, totalPrice
    }
}
