import { useState } from "react";
import api from "../Services/api";

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
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">
          Forgot password
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
          <input
            type="email"
            placeholder="Email address"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-3 text-sm
                       focus:outline-none focus:border-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white
                       text-sm font-medium hover:opacity-90"
          >
            {loading ? "Sending…" : "Send reset link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
