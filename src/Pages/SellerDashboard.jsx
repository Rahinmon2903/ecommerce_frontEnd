import { useState } from "react";
import api from "../Services/api";

const SellerDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: form.price,
        category: form.category,
        stock: form.stock,
        images: form.image ? [form.image] : [],
      };

      await api.post("/products/create", payload);
      alert("Product published");

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const previewImage =
    form.image || "https://via.placeholder.com/500x500?text=Product+Image";

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="mb-14">
          <h1 className="text-3xl font-semibold text-gray-900">
            Add new product
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            This is exactly how customers will see your product
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8
                       shadow-[0_18px_60px_rgba(0,0,0,0.08)]
                       space-y-9"
          >
            <div>
              <label className="text-xs text-gray-500">Product name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Premium wireless headphones"
                className="w-full mt-2 border-b px-1 py-2.5 text-sm
                           placeholder-gray-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe what makes this product special…"
                className="w-full mt-2 border-b px-1 py-2.5 text-sm
                           placeholder-gray-400 resize-none focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-gray-500">Price (₹)</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="2999"
                  className="w-full mt-2 border-b px-1 py-2.5 text-sm
                             placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Stock</label>
                <input
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="50"
                  className="w-full mt-2 border-b px-1 py-2.5 text-sm
                             placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Electronics"
                className="w-full mt-2 border-b px-1 py-2.5 text-sm
                           placeholder-gray-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full mt-2 border-b px-1 py-2.5 text-sm
                           placeholder-gray-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3.5 bg-gray-900 text-white
                         text-sm font-medium tracking-wide
                         rounded-2xl hover:opacity-90
                         active:scale-[0.99] transition"
            >
              Publish product
            </button>
          </form>

          {/* PREVIEW */}
          <div className="bg-white rounded-2xl p-8
                          shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
            <p className="text-xs text-gray-400 mb-3">
              Live preview
            </p>

            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center">
              <img
                src={previewImage}
                alt="Preview"
                className="max-h-72 object-contain"
              />
            </div>

            <h3 className="mt-8 text-xl font-semibold text-gray-900 leading-snug">
              {form.name || "Product name"}
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {form.description || "Product description will appear here"}
            </p>

            <p className="mt-6 text-2xl font-semibold text-gray-900">
              ₹ {form.price || "0"}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Category: {form.category || "—"} · Stock: {form.stock || "—"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
