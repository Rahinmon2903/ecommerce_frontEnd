import { useState } from "react";
import api from "../Services/api";
import { toast } from "react-toastify";

const SellerDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("stock", form.stock);

      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i]);
      }

      await api.post("/products/create", formData);

      toast.success("Product added successfully");

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        images: [],
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add product"
      );
    }
  };

  const previewImage =
    form.images.length > 0
      ? URL.createObjectURL(form.images[0])
      : "https://via.placeholder.com/500x500?text=Product+Image";

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold mb-10">
          Add new product
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow space-y-6"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product name"
              required
              className="w-full border-b p-2"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows={4}
              className="w-full border-b p-2"
            />

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="w-full border-b p-2"
            />

            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              required
              className="w-full border-b p-2"
            />

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border-b p-2"
            />

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  images: Array.from(e.target.files),
                })
              }
            />

            <button className="w-full bg-black text-white py-3 rounded-xl">
              Publish product
            </button>
          </form>

          {/* PREVIEW */}
          <div className="bg-white p-8 rounded-2xl shadow">
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-72 mx-auto object-contain"
            />

            <h2 className="mt-6 text-xl font-semibold">
              {form.name || "Product name"}
            </h2>

            <p className="text-gray-600 mt-2">
              {form.description || "Product description"}
            </p>

            <p className="mt-4 text-2xl font-bold">
              ₹ {form.price || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
