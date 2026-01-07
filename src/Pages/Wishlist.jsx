import { useEffect, useState } from "react";
import api from "../Services/api";
import { Link } from "react-router-dom";

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
      console.error("Failed to fetch wishlist", error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      setWishlist((prev) =>
        prev.filter((item) => item._id !== productId)
      );
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
    }
  };

  //  LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading wishlist…
      </div>
    );
  }

  //  EMPTY WISHLIST
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium">
            Your wishlist is empty
          </h2>
          <Link
            to="/products"
            className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-md text-sm"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <h1 className="text-2xl font-semibold mb-10">
          My Wishlist
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {wishlist.map((product) => {
            const imageUrl =
              product.images?.[0] ||
              "https://via.placeholder.com/300x300?text=No+Image";

            return (
              <div
                key={product._id}
                className="border rounded-xl overflow-hidden hover:shadow-md transition"
              >
                <Link to={`/products/${product._id}`}>
                  <div className="bg-gray-50 aspect-square p-4">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <h3 className="text-sm font-medium line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-base font-semibold">
                    ₹ {product.price}
                  </p>

                  <button
                    onClick={() =>
                      removeFromWishlist(product._id)
                    }
                    className="mt-4 text-sm text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
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
