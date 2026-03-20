import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cartItems, getCartTotal } = useCart();
  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center bg-gray-50/50 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-white p-6 rounded-full inline-block mb-6 shadow-sm border border-gray-100">
          <ShoppingBag className="h-12 w-12 text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Looks like you haven't added anything to your cart yet. Let's get you
          started.
        </p>
        <Link
          to="/products"
          className="btn btn-primary rounded-full px-8 py-3 text-lg"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-12">
          Your Cart
        </h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-16 bg-gray-50 rounded-2xl p-6 lg:col-span-4 lg:mt-0 sticky top-24 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            <dl className="space-y-4 text-sm text-gray-600">
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <dt>Subtotal</dt>
                <dd className="font-medium text-gray-900">
                  ₹{total.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <dt className="flex items-center">Shipping estimate</dt>
                <dd className="font-medium text-gray-900">
                  ₹{(total > 100 ? 0 : 5.0).toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <dt className="flex items-center">Tax estimate</dt>
                <dd className="font-medium text-gray-900">
                  ₹{(total * 0.08).toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between pt-4 pb-2 border-t border-gray-200">
                <dt className="text-lg font-bold text-gray-900">Order total</dt>
                <dd className="text-lg font-bold text-gray-900">
                  ₹{(total + (total > 100 ? 0 : 5) + total * 0.08).toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <Link
                to="/checkout"
                className="w-full btn btn-primary flex justify-center items-center rounded-xl py-4 text-lg hover:bg-gray-900"
              >
                Checkout
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="flex justify-center text-sm font-medium text-gray-500 hover:text-black transition-colors">
                <Link to="/products" className="inline-flex items-center">
                  or Continue Shopping
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
