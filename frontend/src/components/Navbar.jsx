import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Search, User, Menu, X, Leaf } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import logoSuddh from "../assets/logo-suddh.png";

export default function Navbar() {
  const { getCartCount } = useCart();
  const count = getCartCount();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/#", label: "About Us" },
    // { to: "/products?category=Sweets", label: "Sweets" },
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              className="sm:hidden text-gray-500 hover:text-amber-600 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <Link to="/" className="flex items-center gap-2 group">
              {/* <div className="bg-amber-500 rounded-lg p-1.5 group-hover:bg-amber-600 transition-colors">
                <Leaf className="h-4 w-4 text-white" />
              </div> */}
              <div className="flex flex-col leading-tight">
                <span className="text-base font-extrabold text-gray-900 tracking-tight leading-none">
                  <img
                    src={logoSuddh}
                    alt="Logo"
                    className="h-14 w-28"
                  />
                </span>
                {/* <span className="text-[9px] font-medium text-amber-600 tracking-widest uppercase leading-none">
                  ABPH Best Food Pvt. Ltd.
                </span> */}
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link text-sm pb-0.5 ${
                  location.pathname === link.to
                    ? "text-amber-600 font-semibold"
                    : "text-gray-600 hover:text-amber-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <Link
              to="/products"
              className="text-gray-500 hover:text-amber-600 transition-colors duration-200 hover:scale-110 active:scale-95"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="text-gray-500 hover:text-amber-600 transition-colors duration-200 hover:scale-110 active:scale-95"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-500 hover:text-amber-600 transition-colors duration-200 hover:scale-110 active:scale-95"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-white border-t border-amber-100 px-4 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 font-medium py-2 px-3 rounded-lg transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
