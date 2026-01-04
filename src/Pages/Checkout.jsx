import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart");
      setCart(response.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      //converts the cart into order create a document in order collection
      const orderRes = await api.post("/orders/checkout");
      const orderId = orderRes.data.createOrder._id;

      //create razorpayorder and sending the orderId to backend
      const paymentRes = await api.post("/payment/create", { orderId });

      // razorpayOrder, key these two will generated from backend
      const { razorpayOrder, key } = paymentRes.data;

      const options = {
        key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Ecommerce",
        order_id: razorpayOrder.id,
        handler: async function (response) {
            //once the payement is completed razor-pay will generate all three
             await api.post("/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
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
      console.log(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.products.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      <h1>Your Checkout</h1>

      {cart.products.map((item) => (
        <div key={item.productId._id}>
          <p>{item.productId.name}</p>
          <p>₹ {item.productId.price}</p>
          <p>Qty: {item.quantity}</p>
        </div>
      ))}

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default CheckOut;
