import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();

  // Read auth from localStorage
  const auth = JSON.parse(localStorage.getItem("auth"));
  const user = auth?.user;
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" aria-label="Home" className="flex items-center">
          <Logo size={90} />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm">
          {/* NOT LOGGED IN */}
          {!auth && (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-black transition"
              >
                Sign in
              </Link>

              <Link
                to="/register-choice"
                className="text-black font-medium hover:opacity-70 transition"
              >
                Create account
              </Link>
            </>
          )}

          {/* BUYER */}
          {auth && role === "buyer" && (
            <>
              <Link
                to="/cart"
                className="text-gray-600 hover:text-black transition"
              >
                Cart
              </Link>

              <Link
                to="/my-orders"
                className="text-gray-600 hover:text-black transition"
              >
                My Orders
              </Link>
              <Link
                to="/wishlist"
                className="text-gray-600 hover:text-black transition"
              >
                Wishlist
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

          {/* SELLER */}
          {auth && role === "seller" && (
            <>
              <Link
                to="/seller-dashboard"
                className="text-gray-600 hover:text-black transition"
              >
                Dashboard
              </Link>

              <Link
                to="/seller-orders"
                className="text-gray-600 hover:text-black transition"
              >
                Orders
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
