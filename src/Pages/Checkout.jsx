import { useEffect, useState, useMemo } from "react";
import api from "../Services/api";
import { toast } from "react-toastify";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

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
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to load cart";
      toast.error(msg);
      setCart({ products: [] }); 
    } finally {
      setCartLoading(false);
    }
  };

  const items = useMemo(() => {
    return cart?.products?.filter((i) => i.productId) || [];
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
      toast.error("Please fill all shipping details");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Payment service unavailable");
      return;
    }

    try {
      setPaymentLoading(true);

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

          toast.success("Payment successful");
          setCart({ products: [] });
          window.dispatchEvent(new Event("cart-updated"));
        },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Payment failed";
      toast.error(msg);
    } finally {
      setPaymentLoading(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full" />
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
        <h1 className="text-2xl font-semibold mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-12">
            {/* ITEMS */}
            <div className="bg-white rounded-2xl p-7 shadow">
              <h2 className="text-lg font-medium mb-6">Order Items</h2>

              {items.map((item) => {
                const p = item.productId;
                const imageUrl =
                  p.images?.[0] ||
                  "https://via.placeholder.com/200";

                return (
                  <div key={item._id} className="flex gap-6 mb-4">
                    <img
                      src={imageUrl}
                      className="w-20 h-20 object-contain bg-gray-100 rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm">{p.name}</p>
                      <p className="text-xs text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₹ {p.price * item.quantity}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* SHIPPING */}
            <div className="bg-white rounded-2xl p-7 shadow space-y-4">
              <h2 className="text-lg font-medium">Shipping Address</h2>

              {Object.keys(shipping).map((key) => (
                <input
                  key={key}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
                  className="w-full border-b py-2 outline-none text-sm"
                  value={shipping[key]}
                  onChange={(e) =>
                    setShipping({
                      ...shipping,
                      [key]: e.target.value,
                    })
                  }
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl p-8 shadow h-fit">
            <h2 className="text-lg font-medium mb-4">Summary</h2>

            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="text-xl font-semibold">
                ₹ {total}
              </span>
            </div>

            <button
              onClick={handlePayment}
              disabled={paymentLoading}
              className="w-full py-3 bg-black text-white rounded-xl"
            >
              {paymentLoading ? "Processing…" : "Pay now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

