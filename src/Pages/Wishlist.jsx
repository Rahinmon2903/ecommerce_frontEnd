import { useEffect, useState } from "react";
import api from "../Services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist");
      setWishlist(res.data.wishlist || []);
    } catch (error) {
        const msg =
                      error.response?.data?.message ||
                      error.message ||
                      "Something went wrong";
                  
                    toast.error(msg);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await api.delete(`/wishlist/remove/${productId}`);

      
      setWishlist((prev) =>
        prev.filter((item) => item._id !== productId)
      );
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
        Loading wishlist…
      </div>
    );
  }

  /* ---------------- EMPTY ---------------- */
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Your wishlist is empty
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Save products you love and come back later
          </p>
          <Link
            to="/products"
            className="inline-block mt-8 px-8 py-3 bg-black text-white
                       rounded-full text-sm font-medium hover:opacity-90 transition"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN ---------------- */
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Wishlist
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {wishlist.length} saved item{wishlist.length > 1 && "s"}
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {wishlist.map((product) => {
            const imageUrl =
              product.images?.[0] ||
              "https://via.placeholder.com/400x400?text=No+Image";

            return (
              <div
                key={product._id}
                className="group bg-white rounded-2xl overflow-hidden
                           shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                           hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                           transition-all duration-300"
              >
                {/* IMAGE */}
                <Link to={`/products/${product._id}`}>
                  <div className="relative bg-gradient-to-b from-gray-50 to-white
                                  aspect-square flex items-center justify-center p-6">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain
                                 transition-transform duration-300
                                 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    ₹ {product.price}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <Link
                      to={`/products/${product._id}`}
                      className="text-sm font-medium text-gray-600
                                 hover:text-black transition"
                    >
                      View
                    </Link>

                    <button
                      onClick={(e) =>
                        removeFromWishlist(e, product._id)
                      }
                      className="text-sm font-medium text-red-500
                                 hover:text-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

