import React, { useEffect, useState } from "react";
import api from "../Services/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
        setLoading(true);
      const response = await api.get("/orders/my-orders");
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p>You have no orders yet</p>;
  }

  return (
    <div>
      <h1>My Orders</h1>

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
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹ {order.totalAmount}</p>
          <p>
            <strong>Ordered on:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>

          <hr />

          {order.products.map((item) => (
            <div key={item.productId._id}>
              <p>{item.productId.name}</p>
              <p>
                ₹ {item.productId.price} × {item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
