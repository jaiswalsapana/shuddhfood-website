import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleRemove = () => {
    removeFromCart(item.id);
    toast.success(`${item.name} removed from cart`);
  };

  return (
    <div className="flex bg-white rounded-2xl border border-gray-100 p-4 gap-4 shadow-sm relative group">
      <button
        onClick={handleRemove}
        className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="h-24 w-24 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="pr-8">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-black line-clamp-2">
            {item.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{item.category}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium w-4 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
