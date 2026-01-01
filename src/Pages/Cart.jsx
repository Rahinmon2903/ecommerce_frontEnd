import React, { useEffect, useState } from "react";
import api from "../Services/api";

const Cart = () => {
  const [cart, setCart] = useState(null);

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
    </div>
  );
};

export default Cart;
