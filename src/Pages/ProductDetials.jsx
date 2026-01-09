import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Services/api";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cart
  const [addingToCart, setAddingToCart] = useState(false);

  // Reviews
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth?.user?._id;
  const isBuyer = auth?.user?.role === "buyer";

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/getById/${id}`);
      setProduct(res.data.product);
    } catch {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // -------- ADD TO CART --------
  const addToCart = async () => {
    try {
      setAddingToCart(true);
      await api.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });
      alert("Added to cart");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  // -------- REVIEWS --------
  const alreadyReviewed = product?.reviews?.some(
    (r) => r.user === userId
  );

  const submitReview = async () => {
    if (!comment) return alert("Write a review");

    try {
      setReviewLoading(true);
      const res = await api.post(`/products/${id}/review`, {
        rating,
        comment,
      });

      setProduct({ ...product, reviews: res.data.reviews });
      setComment("");
      setRating(5);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add review");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-sm text-gray-500">Loading…</p>;
  }

  if (!product) {
    return <p className="p-6 text-sm text-gray-500">Product not found</p>;
  }

  const imageUrl =
    product.images?.[0] ||
    "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ===== PRODUCT HERO ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* IMAGE */}
          <div className="bg-gray-50 rounded-3xl p-12 flex items-center justify-center">
            <img
              src={imageUrl}
              alt={product.name}
              className="max-h-[420px] object-contain"
            />
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              {product.name}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sold by {product.seller?.name || "Verified Seller"}
            </p>

            <p className="mt-8 text-4xl font-semibold text-gray-900">
              ₹ {product.price}
            </p>

            {/* ADD TO CART */}
            {isBuyer && (
              <div className="mt-6">
                <button
                  onClick={addToCart}
                  disabled={addingToCart}
                  className="w-full py-3 bg-black text-white
                             text-sm font-medium rounded-xl
                             hover:opacity-90 active:scale-[0.99]
                             disabled:opacity-60 transition"
                >
                  {addingToCart ? "Adding…" : "Add to Cart"}
                </button>
              </div>
            )}

            {/* TRUST SECTION */}
            <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
              {[
                {
                  title: "Quality Assured",
                  desc: "Seller verified before dispatch",
                },
                {
                  title: "Fast Delivery",
                  desc: "Reliable shipping nationwide",
                },
                {
                  title: "Secure Payments",
                  desc: "100% protected checkout",
                },
                {
                  title: "Easy Support",
                  desc: "Customer help always available",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                >
                  <p className="font-medium text-gray-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-gray-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* DESCRIPTION */}
            <div className="mt-12">
              <p
                className={`text-sm text-gray-700 leading-relaxed ${
                  showMore ? "" : "line-clamp-5"
                }`}
              >
                {product.description}
              </p>

              {product.description?.length > 250 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="mt-3 text-sm underline text-gray-900"
                >
                  {showMore ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ===== REVIEWS ===== */}
        <div className="mt-24 max-w-4xl">
          <h2 className="text-xl font-medium mb-6">
            Customer Reviews
          </h2>

          {isBuyer && alreadyReviewed && (
            <p className="text-sm text-gray-500 mb-6">
              You’ve already reviewed this product.
            </p>
          )}

          {isBuyer && !alreadyReviewed && (
            <div className="mb-12 space-y-4">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border px-3 py-2 text-sm rounded"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} ★
                  </option>
                ))}
              </select>

              <textarea
                rows={3}
                placeholder="Write your review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border px-4 py-3 text-sm rounded"
              />

              <button
                onClick={submitReview}
                disabled={reviewLoading}
                className="px-6 py-2.5 bg-black text-white
                           text-sm rounded"
              >
                {reviewLoading ? "Submitting…" : "Submit Review"}
              </button>
            </div>
          )}

          {product.reviews?.length ? (
            <div className="space-y-6">
              {product.reviews.map((r, i) => (
                <div key={i} className="border-b pb-4">
                  <p className="font-medium">
                    {r.name} — {r.rating} ★
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {r.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No reviews yet
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
