import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../Services/api";
import AuthSlider from "../Components/AuthSlider";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //there we are sendind form instead of ...form because form is already like this { email: "", password: "" }
      //but in register-buyer or seller we need to send the role also  which makes form like this 
      /*
      {
  "form": {
    "name": "Rahin",
    "email": "abc@gmail.com",
    "password": "123456"
  },
  "role": "buyer"
}
  so only we use ...form which makes it
  {
  "name": "Rahin",
  "email": "abc@gmail.com",
  "password": "123456",
  "role": "buyer"
}
  */

      const res = await api.post("/auth/login", form);
      localStorage.setItem("auth", JSON.stringify(res.data));
      //conditional rendering
      navigate(res.data.user.role === "buyer" ? "/products" : "/seller-dashboard");
    } catch(error){ 
     const msg =
               error.response?.data?.message ||
               error.message ||
               "Something went wrong";
           
             toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      
      {/* LEFT SLIDER */}
      <AuthSlider />

      {/* RIGHT FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-white p-8 rounded-xl">

          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border-b py-2 text-sm focus:outline-none"
            />

            <input
              name="password"
              type="password"
              value={form.password}
              placeholder="Password"
              onChange={handleChange}
              className="w-full border-b py-2 text-sm focus:outline-none"
            />

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm underline text-gray-500">
                Forgot password?
              </Link>
            </div>

            <button className="w-full py-3 bg-black text-white rounded">
              Sign in
            </button>
          </form>

          <p className="mt-6 text-sm text-center">
            New here?{" "}
            <Link to="/register-buyer" className="underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
