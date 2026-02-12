import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../Services/api";
import AuthSlider from "../Components/AuthSlider";
import { toast } from "react-toastify";

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
      //every logic are same just role changed
      await api.post("/auth/register", {
        ...form,
        role: "seller",
      });
      navigate("/login");
    } catch (error) {
       const msg =
                     error.response?.data?.message ||
                     error.message ||
                     "Something went wrong";
                 
                   toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      
      {/* LEFT — SLIDER */}
      <AuthSlider />

      {/* RIGHT — FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-white rounded-lg p-7">

          {/* Header */}
          <h1 className="text-xl font-medium text-gray-900">
            Start selling
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Create your seller account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-9 space-y-7">
            <input
              name="name"
              placeholder="Business or seller name"
              value={form.name}
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
              value={form.email}
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
              value={form.password}
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
              Create seller account
            </button>
          </form>

          {/* Footer */}
          <p className="mt-7 text-center text-sm text-gray-500">
            Want to shop instead?{" "}
            <Link to="/register-buyer" className="underline text-gray-900">
              Create buyer account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterSeller;



