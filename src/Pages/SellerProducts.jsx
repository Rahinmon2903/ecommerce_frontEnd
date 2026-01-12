import { useEffect, useState } from "react";
import api from "../Services/api";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const sellerId = auth?.user?.id;

  /*  FETCH SELLER PRODUCTS  */
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/getdata");

      const sellerProducts = res.data.products.filter(
        (p) => p.seller === sellerId
      );

      setProducts(sellerProducts);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /*  DELETE PRODUCT  */
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/products/delete/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  /*  UPDATE PRODUCT  */
  const updateProduct = async () => {
    try {
      await api.put(`/products/update/${editing._id}`, editing);

      setProducts((prev) =>
        prev.map((p) => (p._id === editing._id ? editing : p))
      );

      toast.success("Product updated");
      setEditing(null);
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-14">

        <h1 className="text-2xl font-semibold mb-10">
          My Products
        </h1>

        {products.length === 0 ? (
          <p className="text-sm text-gray-500">
            You haven’t added any products yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl p-6
                           shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
              >
                <img
                  src={p.images?.[0] || "https://via.placeholder.com/300"}
                  alt={p.name}
                  className="h-40 w-full object-contain mb-5"
                />

                <h3 className="text-lg font-medium">{p.name}</h3>

                <p className="text-sm text-gray-500 mt-1">
                  ₹ {p.price} · Stock: {p.stock}
                </p>

                <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={() => setEditing({ ...p })}
                    className="flex items-center gap-1 text-sm text-blue-600"
                  >
                    <FiEdit2 /> Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="flex items-center gap-1 text-sm text-red-500"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- EDIT MODAL ---------------- */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Edit Product</h2>
              <button onClick={() => setEditing(null)}>
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
                placeholder="Product name"
                className="w-full border-b py-2 text-sm outline-none"
              />

              <textarea
                value={editing.description}
                onChange={(e) =>
                  setEditing({ ...editing, description: e.target.value })
                }
                placeholder="Description"
                rows={3}
                className="w-full border-b py-2 text-sm outline-none"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  value={editing.price}
                  onChange={(e) =>
                    setEditing({ ...editing, price: e.target.value })
                  }
                  placeholder="Price"
                  className="border-b py-2 text-sm outline-none"
                />

                <input
                  type="number"
                  value={editing.stock}
                  onChange={(e) =>
                    setEditing({ ...editing, stock: e.target.value })
                  }
                  placeholder="Stock"
                  className="border-b py-2 text-sm outline-none"
                />
              </div>

              <input
                value={editing.category}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value })
                }
                placeholder="Category"
                className="w-full border-b py-2 text-sm outline-none"
              />
            </div>

            <button
              onClick={updateProduct}
              className="mt-8 w-full py-3 bg-black text-white rounded-xl"
            >
              Save changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
