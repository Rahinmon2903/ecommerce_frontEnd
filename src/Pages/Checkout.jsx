import React, { useEffect, useState, useMemo } from "react";
import api from "../Services/api";

const CheckOut = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart");
      setCart(response.data.cart);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ filter invalid products ONCE
  const items = useMemo(() => {
    if (!cart?.products) return [];
    return cart.products.filter((item) => item.productId);
  }, [cart]);

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + item.productId.price * item.quantity,
      0
    );
  }, [items]);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // 1️⃣ Create MongoDB Order
      const orderRes = await api.post("/orders/checkout");
      const orderId = orderRes.data.createOrder._id;

      // 2️⃣ Create Razorpay Order
      const paymentRes = await api.post("/payment/create", { orderId });
      const { razorpayOrder, key } = paymentRes.data;

      // 3️⃣ Open Razorpay
      const options = {
        key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Ecommerce",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          await api.post("/payment/verify", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
          });

          alert("Payment successful!");
          setCart(null);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // 🟡 LOADING
  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading checkout…
      </div>
    );
  }

  // 🟡 EMPTY CART
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Title */}
        <h1 className="text-2xl font-medium mb-12">
          Checkout
        </h1>

        {/* Items */}
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b border-gray-200 py-4"
            >
              <div>
                <p className="font-medium">
                  {item.productId.name}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-medium">
                ₹ {item.productId.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t pt-8 mt-10">
          <p className="text-lg font-medium">
            Total
          </p>
          <p className="text-lg font-semibold">
            ₹ {total}
          </p>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-10 w-full py-4 bg-black text-white
                     text-sm font-medium rounded-lg
                     hover:opacity-90 disabled:opacity-60 transition"
        >
          {loading ? "Processing payment…" : "Pay now"}
        </button>

      </div>
    </div>
  );
};

export default CheckOut;

