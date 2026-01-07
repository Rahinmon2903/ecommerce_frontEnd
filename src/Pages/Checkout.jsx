import { useEffect, useState, useMemo } from "react";
import api from "../Services/api";

const CheckOut = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data.cart);
    } catch (error) {
      console.error(error);
    }
  };

  const items = useMemo(() => {
    if (!cart?.products) return [];
    return cart.products.filter((i) => i.productId);
  }, [cart]);

  const total = useMemo(() => {
    return items.reduce(
      (sum, i) => sum + i.productId.price * i.quantity,
      0
    );
  }, [items]);

  const handlePayment = async () => {
    if (
      !shipping.fullName ||
      !shipping.phone ||
      !shipping.addressLine ||
      !shipping.city ||
      !shipping.state ||
      !shipping.postalCode
    ) {
      alert("Please fill all shipping details");
      return;
    }

    try {
      setLoading(true);

      const orderRes = await api.post("/orders/checkout", {
        shippingAddress: shipping,
      });

      const orderId = orderRes.data.createOrder._id;

      const paymentRes = await api.post("/payment/create", { orderId });
      const { razorpayOrder, key } = paymentRes.data;

      const options = {
        key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "E-Commerce",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async (response) => {
          await api.post("/payment/verify", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
          });

          alert("Payment successful");
          setCart(null);
        },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading checkout…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">

        <h1 className="text-2xl font-semibold mb-12">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-12">

            {/* ORDER ITEMS */}
            <div className="bg-white rounded-2xl p-7
                            shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
              <h2 className="text-lg font-medium mb-6">
                Order Items
              </h2>

              <div className="space-y-6">
                {items.map((item) => {
                  const p = item.productId;
                  const imageUrl =
                    p.images?.[0] ||
                    "https://via.placeholder.com/200x200?text=No+Image";

                  return (
                    <div key={item._id} className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                        <img
                          src={imageUrl}
                          alt={p.name}
                          className="max-h-full object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm text-gray-800">
                          {p.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="text-base font-semibold text-gray-900">
                        ₹ {p.price * item.quantity}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SHIPPING */}
            <div className="bg-white rounded-2xl p-7
                            shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
              <h2 className="text-lg font-medium mb-6">
                Shipping Address
              </h2>

              <div className="space-y-6">
                <input
                  placeholder="Full name"
                  className="w-full border-b px-1 py-2.5 text-sm
                             placeholder-gray-400 focus:outline-none"
                  value={shipping.fullName}
                  onChange={(e) =>
                    setShipping({ ...shipping, fullName: e.target.value })
                  }
                />

                <input
                  placeholder="Phone number"
                  className="w-full border-b px-1 py-2.5 text-sm
                             placeholder-gray-400 focus:outline-none"
                  value={shipping.phone}
                  onChange={(e) =>
                    setShipping({ ...shipping, phone: e.target.value })
                  }
                />

                <input
                  placeholder="Address line"
                  className="w-full border-b px-1 py-2.5 text-sm
                             placeholder-gray-400 focus:outline-none"
                  value={shipping.addressLine}
                  onChange={(e) =>
                    setShipping({ ...shipping, addressLine: e.target.value })
                  }
                />

                <div className="grid grid-cols-2 gap-6">
                  <input
                    placeholder="City"
                    className="border-b px-1 py-2.5 text-sm
                               placeholder-gray-400 focus:outline-none"
                    value={shipping.city}
                    onChange={(e) =>
                      setShipping({ ...shipping, city: e.target.value })
                    }
                  />

                  <input
                    placeholder="State"
                    className="border-b px-1 py-2.5 text-sm
                               placeholder-gray-400 focus:outline-none"
                    value={shipping.state}
                    onChange={(e) =>
                      setShipping({ ...shipping, state: e.target.value })
                    }
                  />
                </div>

                <input
                  placeholder="Postal code"
                  className="w-full border-b px-1 py-2.5 text-sm
                             placeholder-gray-400 focus:outline-none"
                  value={shipping.postalCode}
                  onChange={(e) =>
                    setShipping({ ...shipping, postalCode: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl p-8 h-fit
                          shadow-[0_16px_50px_rgba(0,0,0,0.08)]">
            <h2 className="text-lg font-medium mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Items</span>
              <span>{items.length}</span>
            </div>

            <hr className="my-6 border-gray-200" />

            <div className="flex justify-between text-[28px] font-semibold text-gray-900">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Inclusive of all taxes
            </p>

            <p className="mt-6 text-xs text-gray-500 text-center">
              Secure checkout powered by Razorpay
            </p>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="mt-6 w-full py-3.5 bg-gray-900 text-white
                         text-sm font-medium tracking-wide
                         rounded-2xl hover:opacity-90
                         active:scale-[0.99]
                         transition disabled:opacity-60"
            >
              {loading ? "Processing…" : "Pay now"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckOut;
