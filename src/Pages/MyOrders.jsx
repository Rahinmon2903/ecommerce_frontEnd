import { useEffect, useState } from "react";
import api from "../Services/api";
import { toast } from "react-toastify";

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
      const msg =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong";
            
              toast.error(msg);
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
      <div className="max-w-5xl mx-auto px-6 py-16">

        <h1 className="text-2xl font-semibold mb-14">
          My Orders
        </h1>

        <div className="space-y-12">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl p-8
                         shadow-[0_14px_45px_rgba(0,0,0,0.07)]"
            >
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                <div>
                  <p className="text-xs text-gray-400">
                    Order placed on
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <p className="text-sm text-gray-700">
                    Total{" "}
                    <span className="ml-1 font-semibold text-gray-900">
                      ₹ {order.totalAmount}
                    </span>
                  </p>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium
                      ${
                        order.status === "paid" || order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="space-y-6">
                {order.products
                  .filter((item) => item.productId)
                  .map((item) => {
                    const p = item.productId;
                    const imageUrl =
                      p.images?.[0] ||
                      "https://via.placeholder.com/150x150?text=No+Image";

                    return (
                      <div
                        key={item._id}
                        className="flex items-center gap-5"
                      >
                        <div className="w-18 h-18 bg-gray-100 rounded-xl
                                        flex items-center justify-center
                                        shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
                          <img
                            src={imageUrl}
                            alt={p.name}
                            className="max-h-full object-contain"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="text-sm text-gray-900 leading-snug">
                            {p.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="text-sm font-semibold text-gray-900">
                          ₹ {p.price * item.quantity}
                        </p>
                      </div>
                    );
                  })}
              </div>

              {/* SHIPPING */}
              {order.shippingAddress && (
                <div className="mt-10 text-sm text-gray-600">
                  <p className="font-medium text-gray-800 mb-2">
                    Shipping Address
                  </p>

                  <p>{order.shippingAddress.fullName}</p>

                  <p className="mt-1">
                    {order.shippingAddress.addressLine},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state} -{" "}
                    {order.shippingAddress.postalCode}
                  </p>

                  <p className="mt-1">
                    Phone: {order.shippingAddress.phone}
                  </p>
                </div>
              )}

              {/* FOOTER */}
              <p className="mt-8 text-xs text-gray-400">
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

