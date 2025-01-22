import { create } from "zustand";
import axios from "axios";
import { toast } from 'react-hot-toast';


// Define API URL based on the environment
const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

// Configure axios to send credentials (cookies) along with requests
axios.defaults.withCredentials = true;

export const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // Signup function
  signup: async ({ email, password, name, role }) => {
	set({ isLoading: true, error: null });
  
	try {
	  // Log the data being sent to the API
	  console.log("Signup data:", { email,  name, role });
  
	  // Make the API call to the signup endpoint
	  const response = await axios.post(`${API_URL}/signup`, {
		email,
		password,
		name,
		role,
	  });

  
	  // If the request is successful, update the store and show a success toast
	  if (response.data.success) {
		toast.success("User created successfully! Please check your email for verification.");
		set({
		  user: response.data.user, // Store user object
		  isAuthenticated: true,     // Set authentication status to true
		  isLoading: false,          // Set loading to false
		});
		return response.data; // Return the response data if needed elsewhere
	  }
	} catch (error) {
	  // Log the full error object to inspect it thoroughly
	  console.error("Full error object:", error);
  
	  // Log the response from the backend if available
	  if (error.response) {
		console.error("Error response data:", error.response.data);
		console.error("Error status:", error.response.status);
	  }
  
	  // Update store with a more specific error message and show an error toast
	  set({
		error: error.response?.data?.message || "Error signing up", // Display server error or fallback message
		isLoading: false, // Set loading to false
	  });
  
	  toast.error(error.response?.data?.message || "Internal server error. Please try again later.");
	}
  },
  

  // Login function
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
      throw error;
    }
  },

  // Logout function
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  // Verify email function
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response.data.message || "Error verifying email", isLoading: false });
      throw error;
    }
  },

  // Check authentication status
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  // Forgot password function
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },

  // Reset password function
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },

  // Refresh Token function (if implemented)
  refreshToken: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/refresh-token`);
      // Update the authentication state if refresh is successful
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: "Error refreshing token", isLoading: false });
      throw error;
    }
  },
}));

// TODO: Implement the axios interceptors for refreshing access token

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);