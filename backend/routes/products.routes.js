import express from "express";
import { getAllProducts,
    getFeaturedProduct,
    createProduct,
    deleteProduct,
    getRecommendedProducts,
    getProductsByCategory,
    toggleFeaturedProduct,
    updateProductQuantity,
    sellProduct } from "../controllers/product.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { sellerRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Route to get all products (requires protection and seller route)
router.get("/", protectRoute, sellerRoute, getAllProducts);

// Route to get featured products
router.get("/featured", getFeaturedProduct);

// Route to create a new product (requires protection and seller route)
router.post("/", protectRoute, sellerRoute, createProduct);

// Route to delete a product (requires protection and seller route)
router.delete("/:id", protectRoute, sellerRoute, deleteProduct);

// Route to toggle featured status of a product (requires protection and seller route)
router.patch("/:id", protectRoute, sellerRoute, toggleFeaturedProduct);

// Route to update product quantity (requires protection and seller route)
router.patch("/:id/quantity", protectRoute, sellerRoute, updateProductQuantity);

// Route to sell a product (decrease quantity) (requires protection and seller route)
router.patch("/:id/sell", protectRoute, sellerRoute, sellProduct);

// Route to get recommended products
router.get("/recommendations", getRecommendedProducts);

// Route to get products by category
router.get("/category/:category", getProductsByCategory);

export default router;
