import React, { useEffect, useState, useMemo } from "react";
import api from "../Services/api";

const CheckOut = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  //  SHIPPING ADDRESS STATE
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
      const response = await api.get("/cart");
      setCart(response.data.cart);
    } catch (error) {
      console.error(error);
    }
  };

  // filter invalid products
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

  //  HANDLE PAYMENT
  const handlePayment = async () => {
    try {
      //  VALIDATE SHIPPING ADDRESS BEFORE CHECKOUT
      if (
        !shipping.fullName ||
        !shipping.phone ||
        !shipping.addressLine ||
        !shipping.city ||
        !shipping.state ||
        !shipping.postalCode
      ) {
        alert("Please fill all shipping address fields");
        return;
      }

      setLoading(true);

      // 1️ CREATE ORDER (WITH SHIPPING ADDRESS)
      const orderRes = await api.post("/orders/checkout", {
        shippingAddress: shipping,
      });

      const orderId = orderRes.data.createOrder._id;

      // 2️ CREATE RAZORPAY ORDER
      const paymentRes = await api.post("/payment/create", { orderId });
      const { razorpayOrder, key } = paymentRes.data;

      // 3️ OPEN RAZORPAY
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

  // LOADING
  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading checkout…
      </div>
    );
  }

  // EMPTY CART
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

        <h1 className="text-2xl font-medium mb-10">
          Checkout
        </h1>

        {/* ITEMS */}
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-4"
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

        {/* SHIPPING ADDRESS */}
        <div className="mt-12 space-y-4">
          <h2 className="text-lg font-medium">
            Shipping Address
          </h2>

          <input
            placeholder="Full Name"
            className="w-full border px-4 py-2"
            value={shipping.fullName}
            onChange={(e) =>
              setShipping({ ...shipping, fullName: e.target.value })
            }
          />

          <input
            placeholder="Phone Number"
            className="w-full border px-4 py-2"
            value={shipping.phone}
            onChange={(e) =>
              setShipping({ ...shipping, phone: e.target.value })
            }
          />

          <input
            placeholder="Address Line"
            className="w-full border px-4 py-2"
            value={shipping.addressLine}
            onChange={(e) =>
              setShipping({ ...shipping, addressLine: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="City"
              className="border px-4 py-2"
              value={shipping.city}
              onChange={(e) =>
                setShipping({ ...shipping, city: e.target.value })
              }
            />

            <input
              placeholder="State"
              className="border px-4 py-2"
              value={shipping.state}
              onChange={(e) =>
                setShipping({ ...shipping, state: e.target.value })
              }
            />
          </div>

          <input
            placeholder="Postal Code"
            className="w-full border px-4 py-2"
            value={shipping.postalCode}
            onChange={(e) =>
              setShipping({ ...shipping, postalCode: e.target.value })
            }
          />
        </div>

        {/* TOTAL */}
        <div className="flex items-center justify-between border-t pt-8 mt-10">
          <p className="text-lg font-medium">Total</p>
          <p className="text-lg font-semibold">
            ₹ {total}
          </p>
        </div>

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-8 w-full py-4 bg-black text-white
                     text-sm font-medium rounded-lg
                     hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Processing payment…" : "Pay now"}
        </button>

      </div>
    </div>
  );
};

export default CheckOut;
