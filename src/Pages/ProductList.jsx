import { useEffect, useState, useMemo } from "react";
import api from "../Services/api";
import ProductCard from "../Components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/getdata");
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "price-low") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, search, sort]);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <h1 className="text-2xl font-semibold">
          Products
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {filteredProducts.length} items available
        </p>
      </div>

      {/* Toolbar */}
      <div className="max-w-6xl mx-auto px-6 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 border rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:border-black"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-40 border rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:border-black"
        >
          <option value="default">Sort</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
        </select>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <p className="text-sm text-gray-500">
            Loading products…
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-sm text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
