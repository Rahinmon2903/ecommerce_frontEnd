import React, { useState } from "react";
import api from "../Services/api";

const SellerDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/create", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      alert("Product added");
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.message);
    }
  };

  return (
    <div>
      <h1>Seller Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />

        <label>Description</label>
        <input name="description" value={form.description} onChange={handleChange} />

        <label>Price</label>
        <input type="number" name="price" value={form.price} onChange={handleChange} />

        <label>Category</label>
        <input name="category" value={form.category} onChange={handleChange} />

        <label>Stock</label>
        <input type="number" name="stock" value={form.stock} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SellerDashboard;
