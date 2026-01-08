import { useEffect, useState } from "react";
import api from "../Services/api";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  const sellerId = JSON.parse(localStorage.getItem("auth"))?.user?.id;

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  const fetchSellerOrders = async () => {
    try {
      const res = await api.get("/orders/seller-orders");

      // support multiple backend response shapes safely
      const data = res.data;
      const ordersArray =
        data.orders ||
        data.SellerOrders ||
        [];

      setOrders(Array.isArray(ordersArray) ? ordersArray : []);
    } catch (error) {
      console.error("Failed to fetch seller orders", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/update-status/${orderId}`, {
        status,
      });
      fetchSellerOrders();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update status"
      );
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-gray-600";
      case "shipped":
        return "text-blue-600";
      case "delivered":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
        Loading orders…
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
        No orders yet
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <h1 className="text-2xl font-medium mb-12">
          Orders
        </h1>

        <div className="divide-y">
          {orders.map((order) => {
            //   convert ObjectId → string before compare
            const items = order.products?.filter(
              (item) =>
                item.productId &&
                item.productId.seller?.toString() === sellerId
            );

            if (!items || items.length === 0) return null;

            return (
              <div key={order._id} className="py-6">
                {/* HEADER */}
                <div
                  onClick={() =>
                    setOpenId(
                      openId === order._id ? null : order._id
                    )
                  }
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      ₹ {order.totalAmount}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {items.length} item(s) ·{" "}
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <span
                      className={`text-sm font-medium ${statusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                    <span className="text-xs text-gray-400">
                      {openId === order._id ? "Hide" : "View"}
                    </span>
                  </div>
                </div>

                {/* DETAILS */}
                {openId === order._id && (
                  <div className="mt-6 space-y-6 text-sm text-gray-700">
                    {/* STATUS */}
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500">
                        Update status
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        className="border px-2 py-1 text-sm focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* PRODUCTS */}
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.productId._id}
                          className="flex justify-between"
                        >
                          <span>
                            {item.productId.name}
                          </span>
                          <span className="text-gray-500">
                            Qty {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* SHIPPING */}
                    <div className="text-gray-600">
                      <p className="font-medium text-gray-800 mb-1">
                        Shipping
                      </p>
                      <p>
                        {order.shippingAddress?.fullName}
                      </p>
                      <p>
                        {order.shippingAddress?.phone}
                      </p>
                      <p>
                        {order.shippingAddress?.addressLine},{" "}
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.state} –{" "}
                        {order.shippingAddress?.postalCode}
                      </p>
                    </div>

                    <p className="text-xs text-gray-400">
                      Order ID: {order._id}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;


