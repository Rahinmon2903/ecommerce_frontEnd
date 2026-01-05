import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../Services/api";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: res.data.token,
          user: res.data.user,
        })
      );

      if (res.data.user.role === "buyer") {
        navigate("/products");
      } else {
        navigate("/seller-dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen relative text-white">
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
    

          {/* Heading */}
          <h1 className="mt-8 text-[2.75rem] font-semibold leading-tight">
            Sign in
          </h1>

          {/* Sub */}
          <p className="mt-4 text-sm text-gray-300">
            Welcome back
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-16 space-y-10 text-left"
          >
            <input
              name="email"
              type="email"
              placeholder="Email address"
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white/30
                         pb-3 text-base placeholder-gray-400
                         focus:outline-none focus:border-white
                         transition-colors duration-200"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white/30
                         pb-3 text-base placeholder-gray-400
                         focus:outline-none focus:border-white
                         transition-colors duration-200"
            />

            <button
              type="submit"
              className="w-full mt-10 py-3.5 bg-white text-black
                         text-sm font-medium tracking-wide
                         hover:opacity-90 transition"
            >
              Sign in →
            </button>
          </form>

          {/* Footer */}
          <p className="mt-12 text-sm text-gray-300">
            Don’t have an account?{" "}
            <Link
              to="/register-buyer"
              className="underline hover:text-white transition"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

