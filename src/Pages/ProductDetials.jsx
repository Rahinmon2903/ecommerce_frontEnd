import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishLoading, setWishLoading] = useState(false);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const isBuyer = auth?.user?.role === "buyer";

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      const response = await api.get(`/products/getById/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      await api.post("/cart/add", {
        productId: id,
        quantity: 1,
      });
      alert("Product added to cart");
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  //  ADD TO WISHLIST
  const addToWishlist = async () => {
    if (!auth) {
      alert("Please login to use wishlist");
      return;
    }

    try {
      setWishLoading(true);
      await api.post(`/wishlist/${id}`);
      alert("Added to wishlist ❤️");
    } catch (error) {
      console.error(error);
      alert("Failed to add to wishlist");
    } finally {
      setWishLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="p-6 text-sm text-gray-500">
        Loading product…
      </p>
    );
  }

  if (!product) {
    return (
      <p className="p-6 text-sm text-gray-500">
        Product not found
      </p>
    );
  }

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/500x500?text=No+Image";

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* IMAGE */}
          <div className="bg-gray-50 rounded-lg p-8">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-2xl font-semibold">
              {product.name}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Seller: {product.seller?.name || "Seller"}
            </p>

            <p className="mt-6 text-3xl font-semibold">
              ₹ {product.price}
            </p>

            <p className="mt-6 text-sm text-gray-700 leading-relaxed">
              {product.description?.trim()
                ? product.description
                : (
                  <span className="text-gray-500 italic">
                    No description provided.
                  </span>
                )}
            </p>

            {/* ACTION BUTTONS */}
            <div className="mt-8 flex gap-4">

              <button
                onClick={addToCart}
                className="px-6 py-3 bg-black text-white
                           text-sm font-medium rounded-lg
                           hover:opacity-90 transition"
              >
                Add to cart
              </button>

              {/* WISHLIST BUTTON (BUYER ONLY) */}
              {isBuyer && (
                <button
                  onClick={addToWishlist}
                  disabled={wishLoading}
                  className="px-6 py-3 border rounded-lg
                             text-sm font-medium
                             hover:bg-gray-50
                             disabled:opacity-60 transition"
                >
                  {wishLoading ? "Adding…" : "❤️ Add to Wishlist"}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
