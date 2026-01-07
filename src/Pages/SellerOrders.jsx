import React, { useEffect, useState } from "react";
import api from "../Services/api";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const sellerId = JSON.parse(localStorage.getItem("auth"))?.user?.id;

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  const fetchSellerOrders = async () => {
    try {
      const response = await api.get("/orders/seller-orders");

      // ✅ SAFELY extract orders
      const data = response.data;

      let ordersArray = [];

      if (Array.isArray(data.orders)) {
        ordersArray = data.orders;
      } else if (Array.isArray(data.SellerOrders)) {
        ordersArray = data.SellerOrders;
      } else {
        ordersArray = [];
      }

      setOrders(ordersArray);
    } catch (error) {
      console.error("Failed to fetch seller orders", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading seller orders...</p>;
  }

  if (!Array.isArray(orders) || orders.length === 0) {
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

          <p>
            <strong>Buyer:</strong>{" "}
            {order.buyer?.name} ({order.buyer?.email})
          </p>

          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹ {order.totalAmount}</p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>

          <hr />

          <h4>Your Products</h4>

          {order.products
            ?.filter(
              (item) =>
                item.productId &&
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
