import { Routes, Route } from "react-router-dom";
import ListProduct from "./pages/Customer/ListProduct/ListProductPage";
import CheckOut from "./pages/Customer/CheckOut/CheckOut";
import Login from "./pages/Customer/Login/Login";
import Profile from "./pages/Customer/Profile/ProfilePage";
import OrderSuccess from "./pages/Customer/OrderSuccess/OrderSuccess"
import ProductDetail from "./pages/Customer/ProductDetail/ProductDetail";
import PromotionsPage from "./pages/Customer/PromotionsPage/PromotionsPage.JSX";
import ProductManagement from "./pages/Admin/ProductManagement/ProductManagement"
import CategoryManagement from "./pages/Admin/CategoryManagement/CategoryManagement";
import GuestRoute from "./routes/GuestRoute";
import RequireAuth from "./routes/RequireAuth";
import UserManagement from "./pages/Admin/UserMangement/UserManagement";
import Layout from "./components/Layout/Layout";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Contact from "./pages/Customer/Contact/Contact"
import UnauthorizedPage from "./pages/Customer/Unauthorized/Unauthorized";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../src/stores/authSlice";


function App() {
  const dispatch = useDispatch();
  const { token, isInitialized } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getProfile());
    } else {
      dispatch({ type: 'auth/setInitialized' });
    }
  }, [dispatch, token]);

  if (token && !isInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* NHÓM PUBLIC: Ai cũng xem được */}
      <Route element={<Layout />}>
        <Route path="/" element={<ListProduct />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/deals" element={<PromotionsPage />} />
        <Route path="/contact" element={<Contact />} />

        {/* THAY CUSTOMER-ROUTE: Chỉ customer mới vào được */}
        <Route element={<RequireAuth allowedRoles={['customer', 'admin']} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/ordersuccessfully" element={<OrderSuccess />} />
        </Route>
      </Route>

      {/* THAY ADMIN-ROUTE: Chỉ admin mới vào được */}
      <Route element={<LayoutAdmin />}>
        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/categories" element={<CategoryManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>
      </Route>

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/unauthorized" element={<UnauthorizedPage />} />

    </Routes>
  );
}

export default App;
