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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

      alert("Product added");

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <h1 className="text-3xl font-semibold tracking-tight">
          Seller Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Add a new product to your store
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-8"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black resize-none"
            />
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock
              </label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                required
                className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              name="image"
              placeholder="https://example.com/product.jpg"
              value={form.image}
              onChange={handleChange}
              className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white text-sm font-medium hover:opacity-90 transition"
            >
              Add product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerDashboard;
