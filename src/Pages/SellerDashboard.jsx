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

    if (form.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("stock", form.stock);

      form.images.forEach((img) => {
        formData.append("images", img);
      });

      await api.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* HEADER */}
        <div className="mb-14">
          <h1 className="text-3xl font-semibold text-gray-900">
            Add new product
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            This is how your product will appear to customers
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
            {/* NAME */}
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

            {/* DESCRIPTION */}
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

            {/* PRICE & STOCK */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-gray-500">Price (₹)</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
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
                  className="w-full mt-2 border-b px-1 py-2.5 text-sm
                             placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* CATEGORY */}
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

            {/* IMAGE UPLOAD */}
            <div>
              <label className="text-xs text-gray-500 block mb-2">
                Product images
              </label>

              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setForm({
                    ...form,
                    images: Array.from(e.target.files),
                  })
                }
              />

              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center
                           border-2 border-dashed border-gray-300
                           rounded-2xl p-6 cursor-pointer
                           hover:border-gray-900 transition"
              >
                <span className="text-sm text-gray-600">
                  Click to upload images
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  JPG, PNG, WEBP · Max 5 images
                </span>
              </label>

              {/* IMAGE PREVIEW */}
              {form.images.length > 0 && (
                <div className="mt-4 grid grid-cols-5 gap-3">
                  {form.images.map((file, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-100 rounded-xl
                                 overflow-hidden flex items-center justify-center"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
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
            <p className="text-xs text-gray-400 mb-3">Live preview</p>

            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center">
              {form.images[0] ? (
                <img
                  src={URL.createObjectURL(form.images[0])}
                  alt="Preview"
                  className="max-h-72 object-contain"
                />
              ) : (
                <span className="text-sm text-gray-400">
                  Image preview
                </span>
              )}
            </div>

            <h3 className="mt-8 text-xl font-semibold text-gray-900">
              {form.name || "Product name"}
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              {form.description || "Product description"}
            </p>

            <p className="mt-6 text-2xl font-semibold text-gray-900">
              ₹ {form.price || "0"}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Category: {form.category || "—"} · Stock:{" "}
              {form.stock || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
