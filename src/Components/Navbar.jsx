import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem("auth"));
  const role = auth?.user?.role;

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* BRAND (TEXT LOGO) */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-black"
        >
          Dream<span className="text-gray-400">It</span>
          <span className="mx-1 text-gray-300">·</span>
          Own<span className="text-gray-400">It</span>
        </Link>

        {/* NAVIGATION */}
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
                to="/"
                className="px-4 py-2 rounded-md bg-black text-white
                           text-sm font-medium hover:opacity-90 transition"
              >
                Create account
              </Link>
            </>
          )}

          {/* BUYER */}
          {auth && role === "buyer" && (
            <>
              <Link className="nav-link" to="/products">
                Products
              </Link>
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
              <Link className="nav-link" to="/my-orders">
                Orders
              </Link>
              <Link className="nav-link" to="/wishlist">
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
              <Link className="nav-link" to="/seller-dashboard">
                Dashboard
              </Link>
              <Link className="nav-link" to="/seller-orders">
                Orders
              </Link>
              <Link className="nav-link" to="/seller-stats">
                Analytics
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
