import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Services/api";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  //  REVIEW STATE
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  //  AUTH INFO
  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth?.user?.id;
  const isBuyer = auth?.user?.role === "buyer";

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/getById/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.error(error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  //  CHECK DUPLICATE REVIEW
  const alreadyReviewed = product?.reviews?.some(
    (r) => r.user === userId
  );

  //  SUBMIT REVIEW
  const submitReview = async () => {
    if (!comment) {
      alert("Please write a review");
      return;
    }

    try {
      setReviewLoading(true);

      const res = await api.post(`/products/${id}/review`, {
        rating,
        comment,
      });

      setProduct({
        ...product,
        reviews: res.data.reviews,
      });

      setRating(5);
      setComment("");

      alert("Review added successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add review");
    } finally {
      setReviewLoading(false);
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
              {product.description}
            </p>
          </div>
        </div>

        {/* ================= REVIEWS ================= */}
        <div className="mt-14">
          <h2 className="text-lg font-medium mb-4">
            Customer Reviews
          </h2>

          {/* BUYER MESSAGE */}
          {isBuyer && alreadyReviewed && (
            <p className="text-sm text-gray-500 mb-4">
              You have already reviewed this product.
            </p>
          )}

          {/* REVIEW FORM */}
          {isBuyer && !alreadyReviewed && (
            <div className="mb-6 space-y-3">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border px-3 py-2"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} ★
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Write your review"
                className="w-full border px-3 py-2"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button
                onClick={submitReview}
                disabled={reviewLoading}
                className="px-5 py-2 bg-black text-white text-sm rounded disabled:opacity-60"
              >
                {reviewLoading ? "Submitting…" : "Submit Review"}
              </button>
            </div>
          )}

          {/* REVIEW LIST */}
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b pb-3"
                >
                  <p className="font-medium">
                    {review.name} — {review.rating} ★
                  </p>
                  <p className="text-sm text-gray-600">
                    {review.comment}
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

