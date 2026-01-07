import React, { useEffect, useState } from "react";
import api from "../Services/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my-orders");
      setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
    } catch (error) {
      console.error(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading your orders…
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        You haven’t placed any orders yet
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <h1 className="text-2xl font-semibold mb-10">
          My Orders
        </h1>

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl border p-6"
            >
              {/* ORDER HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500">
                    Order placed on
                  </p>
                  <p className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <p className="text-sm">
                    <span className="text-gray-500">Total:</span>{" "}
                    <span className="font-medium">
                      ₹ {order.totalAmount}
                    </span>
                  </p>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium
                      ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="divide-y">
                {order.products
                  .filter((item) => item.productId)
                  .map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between py-4 text-sm"
                    >
                      <p className="text-gray-800 max-w-[70%]">
                        {item.productId.name}
                      </p>

                      <p className="text-gray-600">
                        ₹ {item.productId.price} × {item.quantity}
                      </p>
                    </div>
                  ))}
              </div>

              {/* ORDER ID (LOW EMPHASIS) */}
              <p className="mt-4 text-xs text-gray-400">
                Order ID: {order._id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

