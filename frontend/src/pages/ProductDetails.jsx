import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import API from "../config/api";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Fetch product from API
    const fetchProduct = async () => {
      try {
        const response = await fetch(API.GET_PRODUCT(id));
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2 aspect-[4/5] bg-gray-200 rounded-3xl"></div>
          <div className="md:w-1/2 pt-8">
            <div className="h-4 w-24 bg-gray-200 mb-4 rounded"></div>
            <div className="h-10 w-3/4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 mb-8 rounded"></div>
            <div className="space-y-3 mb-12">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
            <div className="h-14 w-full bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
          Product not found
        </h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          We couldn't find the product you're looking for. It might have been
          removed or the link is broken.
        </p>
        <Link to="/products" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-black mb-10 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back
        </button>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Image */}
          <div className="md:w-1/2">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 shadow-lg relative sticky top-24">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:w-1/2 md:pt-10">
            <div className="mb-4">
              <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
              {product.name}
            </h1>

            <div className="text-3xl font-medium text-gray-900 mb-8">
              ₹{product.price.toFixed(2)}
            </div>

            <div className="prose prose-sm text-gray-600 mb-10 text-lg leading-relaxed">
              <p>{product.description}</p>
              <p className="mt-4">
                Made with the finest natural ingredients, carefully sourced
                and handcrafted to preserve authentic flavors and nutritional value.
              </p>
            </div>

            <div className="border-t border-gray-100 pt-8 mt-10">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-medium text-gray-900">Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-full bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black rounded-full"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black rounded-full"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn btn-outline !py-4 rounded-xl flex justify-center items-center gap-2 text-lg"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 btn btn-primary !py-4 rounded-xl text-lg hover:bg-gray-900"
                >
                  Buy it Now
                </button>
              </div>
            </div>

            {/* Fast shipping guarantees */}
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-500">
                  Free shipping on orders over ₹1000
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-500">
                  Easy exchange & return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
