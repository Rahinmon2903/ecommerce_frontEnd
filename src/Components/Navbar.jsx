import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Services/api";
import { FiLayers } from "react-icons/fi";

import {
  FiShoppingCart,
  FiPackage,
  FiHeart,
  FiLogOut,
  FiBox,
  FiGrid,
  FiBarChart2,
} from "react-icons/fi";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const role = auth?.user?.role;

  const [cartCount, setCartCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  /* ---------------- FETCH COUNTS ---------------- */
  const fetchCounts = async () => {
    if (!auth || role !== "buyer") return;

    try {
      const cartRes = await api.get("/cart");
      setCartCount(cartRes.data.cart?.products?.length || 0);

      const orderRes = await api.get("/orders/my-orders");
      setOrderCount(orderRes.data.orders?.length || 0);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [auth, role]);

  useEffect(() => {
    window.addEventListener("cart-updated", fetchCounts);
    return () => window.removeEventListener("cart-updated", fetchCounts);
  }, []);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* BRAND */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-black"
        >
          Dream<span className="text-gray-400">It</span>
          <span className="mx-1 text-gray-300">·</span>
          Own<span className="text-gray-400">It</span>
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-6 text-gray-700">
          {/* NOT LOGGED IN */}
          {!auth && (
            <>
              <Link to="/login" className="hover:text-black">
                Sign in
              </Link>

              <Link
                to="/register-buyer"
                className="px-4 py-2 bg-black text-white rounded-md
                           text-sm font-medium hover:opacity-90"
              >
                Create account
              </Link>
            </>
          )}

          {/* BUYER NAV */}
          {auth && role === "buyer" && (
            <>
              <Link to="/products" className="hover:text-black">
                <FiGrid size={20} />
              </Link>

              <Link to="/cart" className="relative hover:text-black">
                <FiShoppingCart size={20} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2
                                   bg-black text-white
                                   text-[10px] font-semibold
                                   w-4 h-4 rounded-full
                                   flex items-center justify-center"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/my-orders" className="relative hover:text-black">
                <FiPackage size={20} />
                {orderCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2
                                   bg-black text-white
                                   text-[10px] font-semibold
                                   w-4 h-4 rounded-full
                                   flex items-center justify-center"
                  >
                    {orderCount}
                  </span>
                )}
              </Link>

              <Link to="/wishlist" className="hover:text-black">
                <FiHeart size={20} />
              </Link>

              <button
                onClick={handleLogout}
                className="hover:text-red-600 text-red-500"
              >
                <FiLogOut size={18} />
              </button>
            </>
          )}

          {/* SELLER NAV (WITH ICONS) */}
          {auth && role === "seller" && (
            <>
              <Link to="/seller-dashboard" className="hover:text-black">
                <FiBox size={20} />
              </Link>
              <Link to="/seller-products" className="hover:text-black">
                <FiLayers size={20} />
              </Link>

              <Link to="/seller-orders" className="hover:text-black">
                <FiPackage size={20} />
              </Link>

              <Link to="/seller-stats" className="hover:text-black">
                <FiBarChart2 size={20} />
              </Link>

              <button
                onClick={handleLogout}
                className="hover:text-red-600 text-red-500"
              >
                <FiLogOut size={18} />
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
