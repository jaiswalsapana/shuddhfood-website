import { useState } from "react";
import productsData from "../data/products.json";
import { Edit, Trash2, Plus, LogOut } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminDashboard() {
  const [products, setProducts] = useState(productsData);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted successfully");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submittedData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId ? { ...submittedData, id: editingId } : p,
        ),
      );
      toast.success("Product updated successfully");
    } else {
      setProducts([...products, { ...submittedData, id: Date.now() }]);
      toast.success("Product added successfully");
    }

    setShowModal(false);
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setEditingId(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-100 p-8 flex justify-between items-center bg-white">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Dashboard
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Manage your store products and inventory.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setFormData({
                    name: "",
                    price: "",
                    description: "",
                    category: "",
                    image: "",
                  });
                  setEditingId(null);
                  setShowModal(true);
                }}
                className="btn btn-primary flex items-center gap-2 rounded-xl"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto p-4 sm:p-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50 rounded-tl-xl rounded-bl-xl">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50">
                    Price
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50 rounded-tr-xl rounded-br-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      $
                      {typeof product.price === "number"
                        ? product.price.toFixed(2)
                        : parseFloat(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-gray-400 hover:text-black hover:bg-gray-100 p-2 rounded-lg transition-colors mr-2"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
              onClick={() => setShowModal(false)}
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-100 p-8 relative">
              <h3
                className="text-2xl leading-6 font-bold text-gray-900 tracking-tight"
                id="modal-title"
              >
                {editingId ? "Edit Product" : "Add New Product"}
              </h3>

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 input-field"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        className="mt-1 input-field"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        required
                        className="mt-1 input-field"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                      >
                        <option value="">Select...</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Shoes">Shoes</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="url"
                      required
                      className="mt-1 input-field"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      className="mt-1 input-field"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mt-8 sm:flex sm:flex-row-reverse gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto btn btn-primary px-8 rounded-xl"
                  >
                    {editingId ? "Update" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full sm:w-auto sm:mt-0 btn btn-outline rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
