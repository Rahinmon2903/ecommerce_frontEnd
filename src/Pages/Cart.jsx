import { useEffect, useState } from "react";
import api from "../Services/api";
import { useNavigate, Link } from "react-router-dom";

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
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

 const removeItem = async (productId) => {
  setUpdatingId(productId);
  try {
    await api.delete(`/cart/remove/${productId}`);
    fetchCart();
  } catch (err) {
    console.error(err);
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
            className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-md text-sm"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  const items = cart.products.filter((i) => i.productId);

  const total = items.reduce(
    (sum, item) =>
      sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Title */}
        <h1 className="text-2xl font-medium mb-12">
          Shopping cart
        </h1>

        {/* Items */}
        <div>
          {items.map((item) => {
            const disabled = updatingId === item.productId._id;

            return (
              <div
                key={item.productId._id}
                className="flex items-center justify-between border-b border-gray-200 py-6"
              >
                {/* Product */}
                <div>
                  <p className="font-medium">
                    {item.productId.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    ₹ {item.productId.price}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6">
                  {/* Quantity */}
                  <div className="flex items-center gap-3">
                    <button
                      disabled={disabled || item.quantity === 1}
                      onClick={() =>
                        changeQuantity(item.productId._id, -1)
                      }
                      className="w-8 h-8 flex items-center justify-center
                                 border border-gray-300 rounded-md text-sm
                                 hover:bg-gray-50 disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="w-6 text-center text-sm">
                      {item.quantity}
                    </span>

                    <button
                      disabled={disabled}
                      onClick={() =>
                        changeQuantity(item.productId._id, 1)
                      }
                      className="w-8 h-8 flex items-center justify-center
                                 border border-gray-300 rounded-md text-sm
                                 hover:bg-gray-50 disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    disabled={disabled}
                    onClick={() =>
                      removeItem(item.productId._id)
                    }
                    className="text-sm text-gray-400 hover:text-gray-700 disabled:opacity-40"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total + CTA */}
        <div className="mt-16">
          <div className="flex items-center justify-between border-t pt-8">
            <p className="text-lg font-medium">Total</p>
            <p className="text-lg font-semibold">
              ₹ {total}
            </p>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-8 w-full py-4 bg-black text-white
                       text-sm font-medium rounded-lg
                       hover:opacity-90 transition"
          >
            Proceed to checkout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
