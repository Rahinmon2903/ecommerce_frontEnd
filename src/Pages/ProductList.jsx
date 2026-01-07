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
      const res = await api.get("/products/getdata");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
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

    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, search, sort]);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">

      {/* HERO */}
      <section className="bg-gradient-to-b from-black to-zinc-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <span className="text-xs tracking-widest uppercase text-gray-400">
            New arrivals
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">
            Discover products<br />worth owning
          </h1>

          <p className="mt-5 text-gray-300 max-w-xl text-sm leading-relaxed">
            Handpicked items from verified sellers — built for quality,
            priced for everyday value.
          </p>

          {/* Controls */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-80 rounded-xl px-4 py-3 text-sm
                         text-black focus:outline-none"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-48 rounded-xl px-4 py-3 text-sm
                         text-black focus:outline-none"
            >
              <option value="default">Sort</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        {loading ? (
          <p className="text-sm text-gray-500">Loading products…</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-sm text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductList;

