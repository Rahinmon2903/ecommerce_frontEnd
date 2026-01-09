import { useEffect, useState } from "react";
import api from "../Services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data.cart);
    } catch (error) {
       const msg =
    error.response?.data?.message ||
    error.message ||
    "Something went wrong";

  toast.error(msg);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const changeQuantity = async (productId, delta) => {
    setUpdatingId(productId);
    try {
      await api.post("/cart/add", {
        productId,
        quantity: delta,
      });
      fetchCart();
    } catch (error) {
      const msg =
    error.response?.data?.message ||
    error.message ||
    "Something went wrong";

  toast.error(msg);
    } finally {
      setUpdatingId(null);
    }
  };

  const removeItem = async (productId) => {
    setUpdatingId(productId);
    try {
      await api.delete(`/cart/remove/${productId}`);
      fetchCart();
    } catch (error) {
       const msg =
    error.response?.data?.message ||
    error.message ||
    "Something went wrong";

  toast.error(msg);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading cart…
      </div>
    );
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium">Your cart is empty</h2>
          <Link
            to="/products"
            className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-lg text-sm"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  const items = cart.products.filter((i) => i.productId);

  const total = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-14">

        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-10">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => {
              const product = item.productId;
              const disabled = updatingId === product._id;

              const imageUrl =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "https://via.placeholder.com/200x200?text=No+Image";

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl
                             shadow-[0_6px_20px_rgba(0,0,0,0.04)]
                             p-6 flex gap-6"
                >
                  {/* IMAGE */}
                  <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <p className="text-base font-medium text-gray-900 leading-snug">
                      {product.name}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      ₹ {product.price}
                    </p>

                    {/* CONTROLS */}
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          disabled={disabled || item.quantity === 1}
                          onClick={() =>
                            changeQuantity(product._id, -1)
                          }
                          className="w-8 h-8 border rounded-md
                                     text-sm hover:bg-gray-50
                                     disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="w-6 text-center text-sm">
                          {item.quantity}
                        </span>

                        <button
                          disabled={disabled}
                          onClick={() =>
                            changeQuantity(product._id, 1)
                          }
                          className="w-8 h-8 border rounded-md
                                     text-sm hover:bg-gray-50
                                     disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>

                      <button
                        disabled={disabled}
                        onClick={() => removeItem(product._id)}
                        className="text-sm text-gray-400 hover:text-gray-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* ITEM TOTAL */}
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ₹ {product.price * item.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SUMMARY */}
          <div
            className="bg-white rounded-2xl
                       shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                       p-7 h-fit"
          >
            <h2 className="text-lg font-medium mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Items</span>
              <span>{items.length}</span>
            </div>

            <div className="flex justify-between mt-3 text-base font-semibold">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-7 w-full py-3.5 bg-black text-white
                         text-sm font-medium rounded-xl
                         hover:opacity-90 active:scale-[0.99]
                         transition"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
