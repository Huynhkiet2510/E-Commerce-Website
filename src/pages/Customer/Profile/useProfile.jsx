import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../stores/authSlice";
import { useNavigate } from "react-router-dom";
import { clearAllOrders, getOrders, deleteOrderById } from "../../../utils/orderStorage";

export const useProfile = () => {
    const [orders, setOrders] = useState(getOrders());
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const handleClearAllOrder = () => {
        clearAllOrders();
        setOrders([]);
    };

    const handleRemoveOrder = (orderId) => {
        const updatedOrders = deleteOrderById(orderId);
        setOrders(updatedOrders);
    };
    return {
        orders, user, handleLogout, handleClearAllOrder, handleRemoveOrder
    }
}
