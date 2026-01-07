import { useEffect, useState } from "react";
import api from "../Services/api";

const SellerStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/orders/seller-stats");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading dashboard…
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Failed to load stats
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <h1 className="text-2xl font-semibold mb-10">
          Sales Dashboard
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border rounded-xl p-6">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-semibold mt-2">
              ₹ {stats.totalRevenue}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <p className="text-sm text-gray-500">Orders</p>
            <p className="text-2xl font-semibold mt-2">
              {stats.totalOrders}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <p className="text-sm text-gray-500">Items Sold</p>
            <p className="text-2xl font-semibold mt-2">
              {stats.totalItemsSold}
            </p>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">
            Recent Orders
          </h2>

          {stats.recentOrders.length === 0 ? (
            <p className="text-sm text-gray-500">
              No recent orders
            </p>
          ) : (
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between text-sm border-b pb-3"
                >
                  <p>
                    #{order._id.slice(-6)}
                  </p>
                  <p>
                    ₹ {order.totalAmount}
                  </p>
                  <p className="text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerStats;
