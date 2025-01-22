import { Route, Routes, Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ShopPage from "./pages/ShopPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import CartPage from "./pages/CartPage";
import { useUserStore } from "./stores/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner";
import DashboardPage from "./pages/DashboardPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useUserStore();
  const location = useLocation();

  // If user is not authenticated, save the current path to redirect them after login
  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  // If user is authenticated but not verified, redirect to email verification page
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children; // Allow access to the route
};

// Redirect authenticated users away from /signup, /login, and /forgot-password
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useUserStore();

  if (isAuthenticated) {
    // If user is authenticated, redirect them to /dashboard (or any other route you want)
    return <Navigate to="/dashboard" replace />;
  }

  return children;  // Allow unauthenticated users to access these pages
};

function App() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const { user, checkAuth, checkingAuth } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // This will ensure if the user is authenticated and the 'redirect' query is present,
    // we will navigate to the page they wanted to access after login
    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get("redirect");
    if (user && redirect) {
      navigate(redirect); // Redirect to the originally requested page
    }
  }, [location.search, user, navigate]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  console.log("User state:", user);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {isHomepage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/assets/Subtract.png)" }}
        ></div>
      )}

      {isHomepage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-40 px-4">
          <h1 className="text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-600 to-green-800 animate-jump">
            From Our Farms to Your Table
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-white animate-fadeIn mt-6">
            Shop the freshest and healthiest produce grown on our farm and have it delivered to your doorstep!
          </h2>
          <Link to="/shop">
            <button className="mt-8 px-6 py-3 bg-green-600 hover:bg-green-800 text-white text-lg font-bold rounded-lg shadow-lg transition duration-300">
              Visit the Shop
            </button>
          </Link>
        </div>
      )}

      <div className={`relative z-50 ${isHomepage ? "pt-20" : ""}`}>
        <Navbar />
        <Routes>
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
        

          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route
            path="/shop"
            element={<ShopPage />} // No need to protect this route
          />


<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
