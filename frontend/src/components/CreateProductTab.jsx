import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { toast, Toaster } from "react-hot-toast";  // Import toast and Toaster

const categories = [
  "fruits",
  "vegetables",
  "livestock",
  "seafood",
  "dairy-products",
  "grains-cereals",
  "nuts-seeds",
  "tubers-roots",
  "legumes-pulses",
  "herbs-spices",
  "beverages-oil-crops",
  "honey-natural-sweeteners"
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      toast.success("Product created successfully!"); // Success toast
      setNewProduct({ name: "", description: "", price: "", category: "", quantity: "", image: "" });
    } catch (error) {
      console.log("Error creating a product");
      toast.error("Failed to create product!"); // Error toast
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };

      reader.readAsDataURL(file); // Convert to base64
    }
  };

  return (
    <>
      {/* Toast notifications */}
      <Toaster position="top-right" /> {/* Toast container to display notifications */}

      <motion.div
        className="bg-green-50 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-green-700">Create New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-green-600">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="mt-1 block w-full bg-green-100 border border-green-300 rounded-md shadow-sm py-2 px-3 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-green-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              rows="3"
              className="mt-1 block w-full bg-green-100 border border-green-300 rounded-md shadow-sm py-2 px-3 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-green-600">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              step="0.01"
              className="mt-1 block w-full bg-green-100 border border-green-300 rounded-md shadow-sm py-2 px-3 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-green-600">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="mt-1 block w-full bg-green-100 border border-green-300 rounded-md shadow-sm py-2 px-3 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Add Quantity field */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-green-600">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              className="mt-1 block w-full bg-green-100 border border-green-300 rounded-md shadow-sm py-2 px-3 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="cursor-pointer bg-green-100 py-2 px-3 border border-green-300 rounded-md shadow-sm text-sm leading-4 font-medium text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Upload className="h-5 w-5 inline-block mr-2" />
              Upload Image
            </label>
            {newProduct.image && <span className="ml-3 text-sm text-green-400">Image uploaded</span>}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                Loading...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Product
              </>
            )}
          </button>
        </form>
      </motion.div>
    </>
  );
};

export default CreateProductForm;
