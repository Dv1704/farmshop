import React from 'react';
import { ShoppingCart, ShoppingBag, UserPlus, LogIn, LogOut, Lock } from "lucide-react"; // Importing necessary icons from lucide-react
import { Link, useLocation } from "react-router-dom"; // Importing Link and useLocation for navigation and checking current page
import toast, { Toaster } from "react-hot-toast"; // Importing toast and Toaster from react-hot-toast
import { useUserStore } from '../stores/useUserStore';

const Navbar = () => {
  const { user, logout: logoutUser } = useUserStore(); // Using the user state and logout function from the hook
  const cart = [3, 3, 4, 5]; // Array representing cart items (using a sample array, this could be dynamic)

  const location = useLocation(); // Hook to get the current page's location

  // Logout function with notification
  const logout = async () => {
    try {
      console.log('Logging out...');
      // Call the logoutUser function from the user state hook
      await logoutUser();

      // Show a success toast notification with green-hot styling
      toast.success('Logged out successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        theme: 'colored',
        className: 'bg-gradient-to-r from-green-700 to-green-600 text-white', // Green-hot gradient background
        style: { fontWeight: 'bold', borderRadius: '8px' }, // Additional styling for bold text and rounded corners
      });
    } catch (error) {
      // Handle network or other errors
      console.error('Error during logout:', error);
      toast.error('An error occurred while logging out. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        theme: 'colored',
        className: 'bg-gradient-to-r from-red-700 to-red-600 text-white', // Red-hot gradient background
        style: { fontWeight: 'bold', borderRadius: '8px' }, // Additional styling for bold text and rounded corners
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

          {/* Navigation section aligned to the right */}
          <nav className="flex items-center gap-4">
            {/* Button for Shop page */}
            {!isOnShopPage && (
              <Link to="/shop">
                <button className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out hover:bg-green-400">
                  <ShoppingBag size={18} className="inline-block mr-1" />
                  Shop
                </button>
              </Link>
            )}

            {/* Button for Cart page */}
            {user && !isOnCartPage && (
              <Link to="/cart" className="relative">
                <button className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out hover:bg-green-400">
                  <ShoppingCart className="inline-block mr-1" size={18} />
                  <span className="hidden sm:inline">Cart</span>
                </button>

                {/* If cart has items, display the number of items in a red badge */}
                {cart.length > 0 && (
                  <span
                    className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-red-400 transition duration-300 ease-in-out"
                  >
                    {/* Cart length displayed in white */}
                    <span>{cart.length}</span>
                  </span>
                )}
              </Link>
            )}

            {/* If user is logged in, show Log Out and optionally Dashboard for seller */}
            {user ? (
              <>
                {/* Log Out Button for logged-in user */}
                <button
                  className="bg-emerald-800 hover:bg-emerald-700 text-white py-3 px-6 rounded-full flex items-center transition duration-300 ease-in-out"
                  onClick={logout} // Calls the logout function when clicked
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline ml-2">Log Out</span>
                </button>
              </>
            ) : (
              // If user is not logged in, show Sign Up and Login links
              <>
                {/* Sign Up button */}
                <Link
                  to={"/signup"}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>

                {/* Login button */}
                <Link
                  to={"/login"}
                  className="bg-emerald-800 hover:bg-emerald-700 text-white py-3 px-6 rounded-full flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}

            {/* Dashboard link visible to everyone */}
            <Link
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-full font-medium transition duration-300 ease-in-out flex items-center"
              to={"/dashboard"}
            >
              <Lock className="inline-block mr-1" size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Toast Notifications Container */}
      <Toaster position="top-right" />
    </>
  );
};

export default Navbar;
