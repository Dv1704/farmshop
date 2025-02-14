import React from 'react';
import { ShoppingCart, ShoppingBag, UserPlus, LogIn, LogOut, Lock } from "lucide-react"; // Importing necessary icons
import { Link, useLocation } from "react-router-dom"; // Importing Link and useLocation for navigation
import toast, { Toaster } from "react-hot-toast"; // Importing toast and Toaster from react-hot-toast
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';

const Navbar = () => {
  const { user, logout: logoutUser } = useUserStore(); // Using the user state and logout function
  const { cart } = useCartStore();
  const location = useLocation(); // Hook to get the current page's location

  // Logout function with notification
  const logout = async () => {
    try {
      console.log('Logging out...');
      await logoutUser(); // Ensure this is async if using await

      // Show a success toast notification
      toast.success('Logged out successfully!', {
        position: "top-right",
        style: { 
          background: "linear-gradient(to right, #047857, #065F46)", 
          color: "white",
          fontWeight: 'bold',
          borderRadius: '8px',
        },
      });
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('An error occurred while logging out. Please try again.', {
        position: "top-right",
        style: { 
          background: "linear-gradient(to right, #B91C1C, #991B1B)", 
          color: "white",
          fontWeight: 'bold',
          borderRadius: '8px',
        },
      });
    }
  };

  // Check if we are on the shop, cart, or dashboard page
  const isOnShopPage = location.pathname === "/shop";
  const isOnCartPage = location.pathname === "/cart";
  const isOnDashboardPage = location.pathname === "/dashboard";

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-50 to-green-800 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
        <div className="relative container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo section - links to the home page */}
          <Link to="/" className="flex items-center ml-1">
            <img src="/assets/FarmShopLogo.svg" alt="Logo" className="h-10 w-auto" />
          </Link>

          {/* Navigation section */}
          <nav className="flex items-center gap-4">
            {/* Shop button */}
            {!isOnShopPage && (
              <Link to="/shop">
                <button className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out hover:bg-green-400">
                  <ShoppingBag size={18} className="inline-block mr-1" />
                  Shop
                </button>
              </Link>
            )}

            {/* Cart button (only visible when logged in) */}
            {user && !isOnCartPage && (
              <Link to="/cart" className="relative">
                <button className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out hover:bg-green-400">
                  <ShoppingCart className="inline-block mr-1" size={18} />
                  <span className="hidden sm:inline">Cart</span>
                </button>

                {/* Display cart count if cart has items */}
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs transition duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {/* Logged-in User Options */}
            {user ? (
              <>
                {/* Log Out Button */}
                <button
                  className="bg-emerald-800 hover:bg-emerald-700 text-white py-3 px-6 rounded-full flex items-center transition duration-300 ease-in-out"
                  onClick={logout} // Calls the logout function when clicked
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline ml-2">Log Out</span>
                </button>
              </>
            ) : (
              // If user is not logged in, show Sign Up and Login buttons
              <>
                <Link
                  to="/signup"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>

                <Link
                  to="/login"
                  className="bg-emerald-800 hover:bg-emerald-700 text-white py-3 px-6 rounded-full flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}

            {/* Dashboard link */}
            {!isOnDashboardPage && (
              <Link
                to="/dashboard"
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-full font-medium transition duration-300 ease-in-out flex items-center"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </>
  );
};

export default Navbar;
