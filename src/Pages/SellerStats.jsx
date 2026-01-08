import { useEffect, useState, useMemo } from "react";
import api from "../Services/api";

const SellerStats = () => {
  const [rawStats, setRawStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const sellerId = JSON.parse(localStorage.getItem("auth"))?.user?.id;

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/orders/seller-stats");
      setRawStats(res.data);
    } catch (error) {
      console.error(error);
      setRawStats(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🔧 FIX: derive seller-specific stats
   */
  const stats = useMemo(() => {
    if (!rawStats) return null;

    let totalRevenue = 0;
    let totalOrders = 0;
    let totalItemsSold = 0;

    const recentOrders = [];

    rawStats.recentOrders?.forEach((order) => {
      const sellerItems = order.products?.filter(
        (p) =>
          p.productId &&
          p.productId.seller?.toString() === sellerId
      );

      if (!sellerItems || sellerItems.length === 0) return;

      totalOrders += 1;

      sellerItems.forEach((item) => {
        totalItemsSold += item.quantity;
        totalRevenue += item.productId.price * item.quantity;
      });

      recentOrders.push(order);
    });

    return {
      totalRevenue,
      totalOrders,
      totalItemsSold,
      recentOrders,
    };
  }, [rawStats, sellerId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
        Loading dashboard…
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
        Failed to load stats
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* HEADER */}
        <div className="mb-16">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Sales overview
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Performance of your products only
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-20">
          <div>
            <p className="text-sm text-gray-500">
              Revenue
            </p>
            <p className="mt-2 text-4xl font-semibold text-gray-900">
              ₹ {stats.totalRevenue}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Orders containing your products
            </p>
            <p className="mt-2 text-4xl font-semibold text-gray-900">
              {stats.totalOrders}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Items sold
            </p>
            <p className="mt-2 text-4xl font-semibold text-gray-900">
              {stats.totalItemsSold}
            </p>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Recent orders
          </h2>

          {stats.recentOrders.length === 0 ? (
            <p className="text-sm text-gray-500">
              No recent orders
            </p>
          ) : (
            <div className="divide-y">
              {stats.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="py-5 flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      #{order._id.slice(-6)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="text-gray-700 font-medium">
                    ₹ {order.totalAmount}
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
