import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block focus:outline-none">
      <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300 hover:-translate-y-1">

        {/* Image */}
        <div className="aspect-[4/5] overflow-hidden bg-amber-50 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          {/* Add to Cart Overlay */}
          <button
            onClick={handleAdd}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-[90%] bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold tracking-widest text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded-full">
              {product.category}
            </span>
            <span className="font-bold text-gray-900 text-sm">
              ₹{product.price.toFixed(2)}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm truncate mt-1 group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
