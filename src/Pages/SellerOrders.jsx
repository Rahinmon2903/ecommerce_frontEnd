import React, { useEffect, useState } from "react";
import api from "../Services/api";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const sellerId = JSON.parse(localStorage.getItem("auth"))?.user?.id;

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  const fetchSellerOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/orders/seller-orders");
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading seller orders...</p>;

  if (orders.length === 0) {
    return <p>No orders for your products yet</p>;
  }

  return (
    <div>
      <h1>Seller Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px"
          }}
        >
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Buyer:</strong> {order.buyer.name} ({order.buyer.email})</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Order Total:</strong> ₹ {order.totalAmount}</p>
          <p>
            <strong>Ordered on:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>

          <hr />

          <h4>Your Products in this Order:</h4>

          {order.products
            .filter(
              (item) =>
                item.productId.seller === sellerId
            )
            .map((item) => (
              <div key={item.productId._id}>
                <p>{item.productId.name}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default SellerOrders;
