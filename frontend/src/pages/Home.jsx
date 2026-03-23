import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { ShieldCheck, Truck, Star, Leaf } from "lucide-react";
import heroImage from "../assets/khajurshop.jpeg";
import API from "../config/api";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API.GET_ALL_PRODUCTS);
        const data = await response.json();
        setFeatured(data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      {/* ── Hero Section ── */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-amber-50 via-white to-green-50">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-green-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 sm:pt-22 sm:pb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Left Text */}
            <div className="md:w-1/2">
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-amber-200">
                <Leaf className="h-3.5 w-3.5" />
                100% Pure &amp; Natural — Shuddh Foods
              </span>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-700 tracking-tight mb-4 leading-tight">
                Taste the{" "}
                <span className="text-[#82a648] italic">authentic</span>
                <br />
                homemade goodness.
              </h1>
              <p className="text-base text-gray-500 mb-6 max-w-md leading-relaxed">
                Discover traditional recipes made with farm-fresh ingredients by{" "}
                {/* <span className="font-semibold text-gray-700">
                  ABPH Best Food Pvt. Ltd.
                </span>{" "} */}
                prepared with love, delivered to your door.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 ">
                <Link
                  to="/products"
                  className="btn text-white bg-[#82a648] hover:bg-[#82a648] text-base !py-3 !px-7 rounded-full inline-flex items-center justify-center gap-2"
                >
                  Shop Now →
                </Link>
                {/* <Link
                  to="/products?category=Snacks"
                  className="btn text-black bg-[#fef3c6] hover:bg-[#fef3c6] text-base !py-3 !px-7 rounded-full inline-flex items-center justify-center"
                >
                  Explore Snacks
                </Link> */}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mt-6">
                {[
                  {
                    icon: <ShieldCheck className="h-4 w-4 text-green-600" />,
                    text: "FSSAI Certified",
                  },
                  {
                    icon: <Truck className="h-4 w-4 text-amber-600" />,
                    text: "Fast Delivery",
                  },
                  {
                    icon: <Star className="h-4 w-4 text-amber-500" />,
                    text: "4.8★ Rated",
                  },
                ].map((badge) => (
                  <div
                    key={badge.text}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm"
                  >
                    {badge.icon}
                    {badge.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden md:block md:w-[45%]">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src={heroImage}
                  alt="Delicious homemade food by Shuddh Foods"
                  className="w-full h-[150%] object-cover"
                />
                {/* Floating card */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-2">
                  <div className="bg-amber-100 rounded-lg p-1.5">
                    <Leaf className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 leading-none">
                      Shuddh Foods®
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      Made fresh daily
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured Products ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
        <div className="flex justify-between items-end mb-7">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-1">
              Featured Delights
            </h2>
            <p className="text-gray-500 text-sm">
              Handpicked treats for the joy of eating.
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-amber-600 hover:text-amber-700 hover:underline hidden sm:flex items-center gap-1 transition-colors"
          >
            View everything →
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 sm:hidden">
          <Link to="/products" className="btn btn-outline w-full text-center">
            View everything →
          </Link>
        </div>
      </div>

      {/* ── Shop by Category ── */}
      <div className="bg-gradient-to-b from-gray-50 to-amber-50/40 py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-1 h-7 bg-amber-500 rounded-full"></div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Spices",
                desc: "Premium quality hing (asafoetida) with a pungent aroma and authentic flavor.",
                image: "/assets/hing.jpeg",
                color: "from-orange-500/70",
              },
              {
                name: "Sweets",
                desc: "Traditional mithai & treats",
                image:
                  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                color: "from-pink-500/70",
              },
              {
                name: "Pickles & Jams",
                desc: "Tangy, spicy, finger-licking",
                image:
                  "https://images.unsplash.com/photo-1600180735391-f92d4f29d10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                color: "from-green-600/70",
              },
            ].map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} to-transparent group-hover:opacity-90 transition-opacity duration-500`}
                ></div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-white text-xl font-bold mb-0.5">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm">{category.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-white text-xs font-semibold bg-white/20 px-3 py-1 rounded-full group-hover:bg-white/30 group-hover:translate-x-1 transition-all duration-300">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why Shuddh Foods ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-100">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
          Why Choose <span className="text-amber-600">Shuddh Foods?</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              emoji: "🌿",
              title: "100% Natural",
              desc: "No preservatives, no artificial colors",
            },
            {
              emoji: "👩‍🍳",
              title: "Handcrafted",
              desc: "Made by skilled home chefs daily",
            },
            {
              emoji: "🚚",
              title: "Swift Delivery",
              desc: "Fresh to your doorstep fast",
            },
            {
              emoji: "✅",
              title: "FSSAI Certified",
              desc: "Safe, hygienic & quality assured",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group text-center p-5 rounded-2xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50 hover:shadow-md transition-all duration-300 cursor-default"
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
