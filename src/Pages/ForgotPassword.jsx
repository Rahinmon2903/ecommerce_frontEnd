import { useState } from "react";
import api from "../Services/api";
import AuthSlider from "../Components/AuthSlider";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/forgot-password", { email });
      alert("If the email exists, a reset link has been sent");
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
            Forgot password
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            We’ll send you a reset link
          </p>

          {/* Form */}
          <form onSubmit={submitHandler} className="mt-8 space-y-6">
            <input
              type="email"
              placeholder="Email address"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 bg-transparent
                         py-2.5 text-sm text-gray-900
                         placeholder-gray-400
                         focus:outline-none focus:border-gray-500
                         transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-2.5 bg-black text-white
                         text-sm font-medium rounded
                         hover:opacity-90 active:scale-[0.99]
                         transition disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

