import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
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

  const checkout = async () => {
    try {
     navigate("/checkout");
    } catch (error) {
      console.log(error);
      
    } 
  };

  if (!cart || cart.products.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      <h1>Your Cart</h1>

      {cart.products.map((item) => (
        <div key={item.productId._id}>
          <p>{item.productId.name}</p>
          <p>₹ {item.productId.price}</p>
          <p>Qty: {item.quantity}</p>
        </div>
      ))}

      <button
        onClick={checkout}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        Go to Checkout
      </button>
    </div>
  );
};

export default Cart;
