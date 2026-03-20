import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = getCartTotal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API checkout
    setTimeout(() => {
      setLoading(false);
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/");
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
          Your cart is empty
        </h2>
        <Link
          to="/products"
          className="btn btn-primary rounded-full px-8 py-3 text-lg"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-12">
          Checkout
        </h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="mt-1 input-field"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="mt-1 input-field"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="sm:col-span-2 mt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
                    Shipping Address
                  </h2>
                </div>

                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    required
                    className="mt-1 input-field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    required
                    className="mt-1 input-field"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    required
                    className="mt-1 input-field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    className="mt-1 input-field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <input
                    type="text"
                    id="region"
                    required
                    className="mt-1 input-field"
                  />
                </div>

                <div className="sm:col-span-2 mt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
                    Payment Method
                  </h2>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    required
                    className="mt-1 input-field"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>

                <div>
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <input
                    type="text"
                    id="expiration-date"
                    required
                    className="mt-1 input-field"
                    placeholder="MM/YY"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    required
                    className="mt-1 input-field"
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn btn-primary flex justify-center items-center py-4 rounded-xl text-lg disabled:opacity-70 disabled:cursor-wait hover:bg-gray-900"
                >
                  {loading
                    ? "Processing..."
                    : `Pay $${(total + (total > 100 ? 0 : 5) + total * 0.08).toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-16 bg-gray-50 rounded-2xl p-6 lg:col-span-5 lg:mt-0 sticky top-24 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
              Order Items
            </h2>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="py-6 flex gap-4 pr-2">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between pt-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 leading-tight line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="ml-4 text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
