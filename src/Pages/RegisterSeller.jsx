import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../Services/api";

const RegisterSeller = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        ...form,
        role: "seller",
      });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
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
          <h1 className="mt-6 text-4xl font-semibold leading-tight">
            Start selling
          </h1>

          <p className="mt-3 text-sm text-gray-300">
            Manage products, orders, and payouts
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-16 space-y-10 text-left"
          >
            <input
              name="name"
              placeholder="Business or seller name"
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white/30
                         pb-3 text-base placeholder-gray-400
                         focus:outline-none focus:border-white transition"
            />

            <input
              name="email"
              type="email"
              placeholder="Email address"
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white/30
                         pb-3 text-base placeholder-gray-400
                         focus:outline-none focus:border-white transition"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white/30
                         pb-3 text-base placeholder-gray-400
                         focus:outline-none focus:border-white transition"
            />

            <button
              type="submit"
              className="w-full mt-10 py-3.5 bg-white text-black
                         text-sm font-medium tracking-wide
                         hover:opacity-90 transition"
            >
              Continue →
            </button>
          </form>

          {/* Footer */}
          <p className="mt-12 text-sm text-gray-300">
            Want to shop instead?{" "}
            <Link to="/register-buyer" className="underline">
              Create buyer account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterSeller;


