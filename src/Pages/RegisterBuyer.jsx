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
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="w-full max-w-sm bg-white rounded-lg p-7">
        
        {/* Header */}
        <h1 className="text-xl font-medium text-gray-900">
          Create account
        </h1>
        <p className="mt-1.5 text-sm text-gray-500">
          Buyer registration
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-9 space-y-7">
          <input
            name="name"
            placeholder="Full name"
            onChange={handleChange}
            required
            className="w-full border-b border-gray-300 bg-transparent
                       py-2.5 text-sm text-gray-900
                       placeholder-gray-400
                       focus:outline-none
                       focus:border-gray-500
                       transition"
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            onChange={handleChange}
            required
            className="w-full border-b border-gray-300 bg-transparent
                       py-2.5 text-sm text-gray-900
                       placeholder-gray-400
                       focus:outline-none
                       focus:border-gray-500
                       transition"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border-b border-gray-300 bg-transparent
                       py-2.5 text-sm text-gray-900
                       placeholder-gray-400
                       focus:outline-none
                       focus:border-gray-500
                       transition"
          />

          <button
            type="submit"
            className="w-full mt-6 py-2.5 bg-black text-white
                       text-sm font-medium rounded
                       hover:opacity-90 active:scale-[0.99]
                       transition"
          >
            Create account
          </button>
        </form>

        {/* Footer */}
        <p className="mt-7 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="underline text-gray-900">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterBuyer;


