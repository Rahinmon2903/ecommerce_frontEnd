import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../Services/api";

const RegisterBuyer = () => {
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
        role: "buyer",
      });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
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
      <div className="absolute inset-0 bg-black/45" />

      {/* Centered content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          {/* Brand */}
          
         

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-semibold leading-tight">
            Create account
          </h1>

          {/* Sub */}
          <p className="mt-3 text-sm text-gray-300">
            One account. Faster checkout.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-14 space-y-8 text-left"
          >
            <input
              name="name"
              placeholder="Full name"
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white/40
                         pb-3 text-base placeholder-gray-300
                         focus:outline-none focus:border-white transition"
            />

            <input
              name="email"
              type="email"
              placeholder="Email address"
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white/40
                         pb-3 text-base placeholder-gray-300
                         focus:outline-none focus:border-white transition"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white/40
                         pb-3 text-base placeholder-gray-300
                         focus:outline-none focus:border-white transition"
            />

            <button
              type="submit"
              className="w-full mt-8 py-3 bg-white text-black
                         text-sm font-medium tracking-wide
                         hover:opacity-90 transition"
            >
              Continue →
            </button>
          </form>

          {/* Footer */}
          <p className="mt-10 text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterBuyer;


