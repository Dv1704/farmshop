import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
      className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
        Welcome to Your Dashboard
      </h2>

      {/* Display General User Information */}
      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Profile Information
          </h3>
          <p className="text-gray-300">Name: {user.name}</p>
          <p className="text-gray-300">Email: {user.email}</p>
          <p className="text-gray-300">
            Role:{" "}
            <span
              className={`font-bold ${
                user.role === "seller" ? "text-yellow-400" : "text-blue-400"
              }`}
            >
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </p>
        </motion.div>

        {/* Show Analytics for Sellers */}
        {user.role === "seller" ? (
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              Seller Analytics
            </h3>
            <p className="text-gray-300">
              Visit the{" "}
              <span
                className="text-green-500 cursor-pointer underline"
                onClick={() => navigate("/analytics")}
              >
                Analytics Page
              </span>{" "}
              to track your sales and performance.
            </p>
          </motion.div>
        ) : (
          // Projected Content for Customers
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              My Cart
            </h3>
            <p className="text-gray-300">
              You have {user.cartItems?.length || 0} items in your cart.{" "}
              <span
                className="text-green-500 cursor-pointer underline"
                onClick={() => navigate("/cart")}
              >
                View Cart
              </span>
            </p>
          </motion.div>
        )}

        {/* Account Activity */}
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Account Activity
          </h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined: </span>
            {formatDate(user.createdAt)} {/* Shows user createdAt */}
          </p>
        </motion.div>
      </div>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full sm:w-auto sm:px-6 px-4 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
						focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
