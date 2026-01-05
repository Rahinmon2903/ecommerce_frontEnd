import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  // Not logged in
  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch (if role required)
  if (role && auth.user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
