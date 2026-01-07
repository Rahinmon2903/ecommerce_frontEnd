import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/auth/reset-password/${token}`, { password });
      alert("Password reset successful");
      navigate("/login");
    } catch (error) {
      alert("Reset link invalid or expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">
          Reset password
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <input
            type="password"
            placeholder="New password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-3 text-sm
                       focus:outline-none focus:border-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white
                       text-sm font-medium hover:opacity-90"
          >
            {loading ? "Updating…" : "Reset password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
