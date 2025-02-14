import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductTab from "../components/CreateProductTab";
import ProductsTab from "../components/ProductsList";

const DashboardPage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date) ? "Invalid Date" : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen mx-auto p-8 bg-gradient-to-br from-green-100 to-green-200 text-gray-800 rounded-xl shadow-2xl border border-green-300"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-500 text-transparent bg-clip-text">
        Welcome to Your Dashboard
      </h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4 justify-center">
        <button
          className={`px-4 py-2 rounded-lg text-white ${
            activeTab === "profile"
              ? "bg-gradient-to-r from-yellow-400 to-green-500"
              : "bg-green-600 opacity-70 hover:bg-green-500"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        {user.role === "seller" && (
          <>
            <button
              className={`px-4 py-2 rounded-lg text-white ${
                activeTab === "createProduct"
                  ? "bg-gradient-to-r from-yellow-400 to-green-500"
                  : "bg-green-600 opacity-70 hover:bg-green-500"
              }`}
              onClick={() => setActiveTab("createProduct")}
            >
              Create Product
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-white ${
                activeTab === "products"
                  ? "bg-gradient-to-r from-yellow-400 to-green-500"
                  : "bg-green-600 opacity-70 hover:bg-green-500"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-white ${
                activeTab === "analytics"
                  ? "bg-gradient-to-r from-yellow-400 to-green-500"
                  : "bg-green-600 opacity-70 hover:bg-green-500"
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
          </>
        )}
      </div>

      {/* Tab Content */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <motion.div
            className="p-4 bg-green-50 bg-opacity-80 rounded-lg border border-green-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              Profile Information
            </h3>
            <p className="text-gray-700">Name: {user.name}</p>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">
              Role:{" "}
              <span
                className={`font-bold ${
                  user.role === "seller" ? "text-green-600" : "text-green-700"
                }`}
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Joined: </span>
              {formatDate(user.createdAt)}
            </p>
          </motion.div>
        )}

        {/* Seller Tab Content */}
        {user.role === "seller" && (
          <>
            {activeTab === "createProduct" && <CreateProductTab />}
            {activeTab === "products" && <ProductsTab />}
            {activeTab === "analytics" && <AnalyticsTab />}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;