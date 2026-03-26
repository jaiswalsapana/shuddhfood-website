import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, Leaf } from "lucide-react";
import logoSuddh from "../assets/logo-suddh.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Brand Bar */}
      <div className="bg-amber-600 py-3 text-center text-white text-sm font-medium tracking-wide">
        🌿 Pure. Natural. Premium Quality — Shuddh Foods by ABPH Best Food Pvt. Ltd.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              {/* <div className="bg-amber-500 rounded-lg p-1.5">
                <Leaf className="h-4 w-4 text-white" />
              </div> */}
              <div>
                  <span className="text-base font-extrabold text-gray-900 tracking-tight leading-none">
                      <img src={logoSuddh} alt="Logo" className="h-14 w-28"/>
                  </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              Premium Quality Goodness. Fresh ingredients meet traditional recipes.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-800 hover:bg-amber-600 text-gray-400 hover:text-white p-2 rounded-lg transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-amber-600 text-gray-400 hover:text-white p-2 rounded-lg transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-amber-600 text-gray-400 hover:text-white p-2 rounded-lg transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: "/products", label: "All Products" },
                { to: "/products?category=Snacks", label: "Snacks" },
                { to: "/products?category=Sweets", label: "Sweets" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-200 hover:pl-1 inline-block"
                  >
                    → {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Help</h4>
            <ul className="space-y-2.5 text-sm">
              {["Contact Us", "Track Order"].map((label) => (
                <li key={label}>
                  <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 hover:pl-1 inline-block">
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-gray-400">
                <MapPin className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                <span>
                  Ayush Vihar Colony Phase II,<br />
                  Jankipuram Ext., Lucknow,<br />
                  Uttar Pradesh – 226021
                </span>
              </li>
              <li>
                <a
                  href="mailto:consumer@abphbestfood.com"
                  className="flex items-center gap-2.5 text-gray-400 hover:text-amber-400 transition-colors duration-200"
                >
                  <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                  consumer@abphbestfood.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-5">
              <p className="text-gray-400 text-xs mb-2">Subscribe for exclusive deals:</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-4 py-2 rounded-r-lg font-medium transition-colors">
                  Go
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} <span className="text-amber-500 font-medium">ABPH Best Food Private Limited</span>. All rights reserved. | Brand: Shuddh Foods
          </p>
          <div className="flex space-x-5 text-gray-500 text-xs">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-amber-400 transition-colors">FSSAI Licensed</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
