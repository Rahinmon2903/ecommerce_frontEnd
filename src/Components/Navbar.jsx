import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Services/api";

import {
  FiShoppingCart,
  FiPackage,
  FiHeart,
  FiLogOut,
  FiBox,
  FiGrid,
} from "react-icons/fi";

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

  /*  FETCH COUNTS (BUYER)  */
  useEffect(() => {
    if (!auth || role !== "buyer") return;

    const fetchCounts = async () => {
      try {
        const cartRes = await api.get("/cart");
        setCartCount(cartRes.data.cart?.products?.length || 0);

        const orderRes = await api.get("/orders/my-orders");
        setOrderCount(orderRes.data.orders?.length || 0);
      } catch {
        console.error("Navbar count fetch failed");
      }
    };

    fetchCounts();
  }, [auth, role]);

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
        <nav className="flex items-center gap-6 text-sm text-gray-700">

          {/* NOT LOGGED IN */}
          {!auth && (
            <>
              <Link to="/login" className="hover:text-black">
                Sign in
              </Link>

              <Link
                to="/register-buyer"
                className="px-4 py-2 bg-black text-white rounded-md
                           font-medium hover:opacity-90 transition"
              >
                Create account
              </Link>
            </>
          )}

          {/* BUYER */}
          {auth && role === "buyer" && (
            <>
              {/* PRODUCTS */}
              <Link
                to="/products"
                className="flex items-center gap-1 hover:text-black"
              >
                <FiGrid size={20} />
              </Link>

              {/* CART */}
              <Link to="/cart" className="relative hover:text-black">
                <FiShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2
                                   bg-black text-white
                                   text-[10px] font-semibold
                                   w-4 h-4 rounded-full
                                   flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* ORDERS */}
              <Link to="/my-orders" className="relative hover:text-black">
                <FiPackage size={20} />
                {orderCount > 0 && (
                  <span className="absolute -top-2 -right-2
                                   bg-black text-white
                                   text-[10px] font-semibold
                                   w-4 h-4 rounded-full
                                   flex items-center justify-center">
                    {orderCount}
                  </span>
                )}
              </Link>

              {/* WISHLIST */}
              <Link to="/wishlist" className="hover:text-black">
                <FiHeart size={20} />
              </Link>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:text-red-600"
              >
                <FiLogOut size={18} />
              </button>
            </>
          )}

          {/* SELLER */}
          {auth && role === "seller" && (
            <>
              <Link to="/seller-dashboard" className="hover:text-black">
                Dashboard
              </Link>

              <Link to="/seller-orders" className="hover:text-black">
                <FiBox size={18} />
              </Link>

              <Link to="/seller-stats" className="hover:text-black">
                Analytics
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:text-red-600"
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
