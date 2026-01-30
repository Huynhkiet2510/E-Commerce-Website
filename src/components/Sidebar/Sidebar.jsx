import React from 'react';
import {
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from "../../stores/authSlice";

const Sidebar = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'User', label: 'Người dùng', icon: <UserOutlined />, path: '/admin/users' },
    { id: 'Product', label: 'Sản phẩm', icon: <ShoppingCartOutlined />, path: '/admin/products' },
    { id: 'Category', label: 'Danh mục', icon: <AppstoreOutlined />, path: '/admin/categories' },
  ];

  return (
    <aside className="bg-[#201F50] w-[280px] h-screen flex flex-col p-6 shadow-2xl">

      <div className="flex items-center gap-x-4 mb-10 p-4 rounded-2xl">
        <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
          {user?.name?.charAt(0) || "A"}
        </div>
        <div className="overflow-hidden">
          <p className="font-bold text-white text-sm truncate tracking-tight">
            {user?.name || "Administrator"}
          </p>
          <p className="text-[11px] text-indigo-300/80 uppercase font-black tracking-widest mt-0.5">
            {user?.role || "System Staff"}
          </p>
        </div>
      </div>


      <nav className="flex-1">
        <p className="text-[10px] font-bold text-white uppercase mb-5 px-4 tracking-[0.2em]">
          Main Menu
        </p>

        <ul className="flex flex-col gap-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-x-3 px-4 py-3.5 rounded-xl
                  transition-all duration-300 font-medium text-[14px]
                  ${isActive
                    ? "bg-[#34346B] text-white shadow-lg shadow-indigo-600/20 ring-1 ring-white/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-indigo-200"
                  }
                `}
              >
                <span className={`text-lg ${item.isActive ? 'text-white' : 'text-inherit'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="pt-6 border-t border-white/5">
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          className="flex items-center gap-x-3 w-full px-4 py-3.5
          text-slate-400 hover:text-red-400 hover:bg-red-400/10
          rounded-xl transition-all duration-300 font-semibold text-sm group cursor-pointer"
        >
          <LogoutOutlined className="group-hover:scale-110 transition-transform" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;