import { useEffect, useState } from "react";
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

      // SAFELY HANDLE BACKEND RESPONSE
      const data = response.data;
      let ordersArray = [];

      if (Array.isArray(data.SellerOrders)) {
        ordersArray = data.SellerOrders;
      } else if (Array.isArray(data.orders)) {
        ordersArray = data.orders;
      }

      setOrders(ordersArray);
    } catch (error) {
      console.error("Failed to fetch seller orders", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  //  UPDATE ORDER STATUS
  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/update-status/${orderId}`, {
        status,
      });

      fetchSellerOrders(); // refresh UI
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading seller orders…
      </div>
    );
  }

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

                <div className="text-sm">
                  <span className="text-gray-500">Total:</span>{" "}
                  <span className="font-medium">
                    ₹ {order.totalAmount}
                  </span>
                </div>
              </div>

              {/* STATUS CONTROL */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-gray-600">
                  Current status:
                  <span className="ml-1 font-medium">
                    {order.status}
                  </span>
                </span>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border px-3 py-1 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* SHIPPING ADDRESS */}
              <div className="mb-6 text-sm text-gray-700">
                <h4 className="font-medium mb-1">
                  Shipping Address
                </h4>
                <p>{order.shippingAddress?.fullName}</p>
                <p>{order.shippingAddress?.phone}</p>
                <p>
                  {order.shippingAddress?.addressLine},{" "}
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.state} –{" "}
                  {order.shippingAddress?.postalCode}
                </p>
              </div>

              {/* PRODUCTS */}
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
                      className="flex items-center justify-between py-3 text-sm"
                    >
                      <p className="text-gray-800">
                        {item.productId.name}
                      </p>
                      <p className="text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  ))}
              </div>

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


