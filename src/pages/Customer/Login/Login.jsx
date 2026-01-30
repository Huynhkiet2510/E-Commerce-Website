import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getProfile } from "../../../stores/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { loginStatus, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password })).unwrap();

      const profile = await dispatch(getProfile()).unwrap();

      if (from && from !== '/') {
        navigate(from, { replace: true });
      } else {
        if (profile.role === "admin") {
          navigate("/admin/users", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }

    } catch (error) {
      console.error("Login failed", error);
    }
  };



  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password" 
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={loginStatus === "loading"}
          className="bg-blue-600 text-white w-full py-2 rounded mt-2 disabled:opacity-50"
        >
          {loginStatus === "loading" ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
