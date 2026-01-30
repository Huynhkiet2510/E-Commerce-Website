import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom"; 

const GuestRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (user) {
    const from = location.state?.from?.pathname || (user.role === "admin" ? "/admin/user" : "/");
    return <Navigate to={from} replace />;
  }
  return <Outlet />;
};

export default GuestRoute;