import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../Services/api";

const ProductCard = ({ product }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isBuyer = auth?.user?.role === "buyer";

  const [wishLoading, setWishLoading] = useState(false);
  const [wishAdded, setWishAdded] = useState(false);

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/500x500?text=No+Image";

  const addToWishlist = async (e) => {
    e.preventDefault(); // ⛔ prevent card navigation
    e.stopPropagation();

    if (!isBuyer) {
      alert("Login as buyer to use wishlist");
      return;
    }

    try {
      setWishLoading(true);

      await api.post("/wishlist/add", {
        productId: product._id,
      });

      setWishAdded(true);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add to wishlist"
      );
    } finally {
      setWishLoading(false);
    }
  };

  return (
    <div className="group relative">
      {/* WISHLIST ICON */}
      {isBuyer && (
        <button
          onClick={addToWishlist}
          disabled={wishLoading}
          className="absolute top-3 right-3 z-10
                     w-9 h-9 rounded-full
                     bg-white/90 backdrop-blur
                     flex items-center justify-center
                     text-lg transition
                     hover:scale-105
                     disabled:opacity-60"
        >
          {wishAdded ? "❤️" : "🤍"}
        </button>
      )}

      {/* CARD */}
      <Link to={`/products/${product._id}`}>
        <div className="bg-white rounded-2xl overflow-hidden
                        transition group-hover:translate-y-[-2px]">

          {/* IMAGE */}
          <div className="relative w-full aspect-square bg-[#FAFAFA]">
            <img
              src={imageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full
                         object-contain p-8"
            />
          </div>

          {/* CONTENT */}
          <div className="px-4 pt-4 pb-5">
            <h3 className="text-sm font-medium text-gray-900
                           leading-snug line-clamp-2">
              {product.name}
            </h3>

            <p className="mt-2 text-base font-semibold text-gray-900">
              ₹ {product.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
