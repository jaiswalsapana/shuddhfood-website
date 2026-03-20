import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { Search } from "lucide-react";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  const categories = ["All", ...new Set(productsData.map((p) => p.category))];

  useEffect(() => {
    // Reset loading state when category changes
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = productsData;

      if (selectedCategory !== "All") {
        filtered = filtered.filter((p) => p.category === selectedCategory);
      }

      if (searchTerm) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      setProducts(filtered);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm]);

  // Update category when URL param changes
  useEffect(() => {
    if (categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h1>
          <p className="text-gray-500 mt-2">
            Showing {products.length}{" "}
            {products.length === 1 ? "result" : "results"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-black focus:border-black outline-none w-full sm:w-64"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <Loader skeletonCount={8} />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-gray-500 text-lg">
            No products found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              handleCategoryChange("All");
            }}
            className="mt-6 text-black font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
