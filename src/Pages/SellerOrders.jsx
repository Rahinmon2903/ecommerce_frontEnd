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

      const data = response.data;

      let ordersArray = [];

      if (Array.isArray(data.orders)) {
        ordersArray = data.orders;
      } else if (Array.isArray(data.SellerOrders)) {
        ordersArray = data.SellerOrders;
      }

      setOrders(ordersArray);
    } catch (error) {
      console.error("Failed to fetch seller orders", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  //  LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading seller orders…
      </div>
    );
  }

  // NO ORDERS
  if (!orders.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        No orders for your products yet
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <h1 className="text-2xl font-semibold mb-10">
          Seller Orders
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

              {/* BUYER INFO */}
              <div className="mb-4 text-sm text-gray-700">
                <p>
                  <strong>Buyer:</strong>{" "}
                  {order.buyer?.name} ({order.buyer?.email})
                </p>
              </div>

              {/* PRODUCTS (ONLY SELLER PRODUCTS) */}
              <div className="divide-y">
                {order.products
                  ?.filter(
                    (item) =>
                      item.productId &&
                      item.productId.seller === sellerId
                  )
                  .map((item) => (
                    <div
                      key={item.productId._id}
                      className="flex items-center justify-between py-4 text-sm"
                    >
                      <p className="text-gray-800 max-w-[70%]">
                        {item.productId.name}
                      </p>

                      <p className="text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  ))}
              </div>

              {/* SHIPPING ADDRESS */}
              {order.shippingAddress && (
                <div className="mt-5 text-sm text-gray-600">
                  <p className="font-medium text-gray-700 mb-1">
                    Shipping Address
                  </p>

                  <p>
                    {order.shippingAddress.fullName}
                  </p>

                  <p>
                    {order.shippingAddress.addressLine},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state} -{" "}
                    {order.shippingAddress.postalCode}
                  </p>

                  <p>
                    Phone: {order.shippingAddress.phone}
                  </p>
                </div>
              )}

              {/* ORDER ID */}
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

export default SellerOrders;

