import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../stores/authSlice';

export const useNavbarLogic = (setInputSearch) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const cartItems = useSelector(state => state.cart.cart);
    const user = useSelector(state => state.auth.user);

    const menuRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const navLinks = [
        { title: 'Trang chủ', url: '/' },
        { title: 'Khuyến mãi', url: '/deals' },
        { title: 'Liên hệ', url: '/contact' },
    ];

    const handleLogoClick = () => {
        setInputSearch("");
        if (pathname === "/") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate("/");
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        setIsUserMenuOpen(false);
        navigate("/login");
    };

    return {
        state: { isMenuOpen, isCartOpen, isUserMenuOpen, cartCount: cartItems.length, user },
        actions: { setIsMenuOpen, setIsCartOpen, setIsUserMenuOpen, handleLogoClick, handleLogout },
        refs: { menuRef },
        navLinks
    };
};