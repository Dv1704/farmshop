import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";

// Controller to get all products
export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}); // find all products
		res.json({ products });
	} catch (error) {
		console.log("Error in getAllProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Controller to get featured products
export const getFeaturedProduct = async (req, res) => {
	try {
		let featuredProducts = await redis.get("featured_products");
		if (!featuredProducts) {
			// Fetch featured products from the database if not in cache
			featuredProducts = await Product.find({ isFeatured: true }).lean();

			if (!featuredProducts) {
				return res.status(404).json({ message: "No featured products found" });
			}

			// Store in Redis for future quick access
			await redis.set("featured_products", JSON.stringify(featuredProducts));
		} else {
			featuredProducts = JSON.parse(featuredProducts);
		}

		res.json(featuredProducts);
	} catch (error) {
		console.log("Error in getFeaturedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Controller to create a new product
export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category, quantity } = req.body;

		// Validate quantity
		if (quantity < 0) {
			return res.status(400).json({ message: "Quantity cannot be negative" });
		}

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			category,
			quantity, // Include quantity in the product creation
		});

		res.status(201).json(product);
	} catch (error) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Controller to update product quantity
export const updateProductQuantity = async (req, res) => {
	try {
		const { quantity } = req.body;
		if (quantity < 0) {
			return res.status(400).json({ message: "Quantity cannot be negative" });
		}

		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Update the quantity field with the new quantity
		product.quantity = quantity;
		await product.save();

		res.json({ message: "Product quantity updated", product });
	} catch (error) {
		console.log("Error in updateProductQuantity controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Controller to decrease the product quantity (sell product)
export const sellProduct = async (req, res) => {
	try {
		const { quantity } = req.body; // quantity to be sold
		if (quantity <= 0) {
			return res.status(400).json({ message: "Quantity to sell should be greater than zero" });
		}

		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Check if the quantity is enough to sell
		if (product.quantity < quantity) {
			return res.status(400).json({ message: "Not enough stock to sell" });
		}

		// Decrease the product quantity
		product.quantity -= quantity;

		// Save the updated product
		await product.save();

		res.json({ message: `${quantity} product(s) sold`, product });
	} catch (error) {
		console.log("Error in sellProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Controller to delete a product
export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloudinary");
			} catch (error) {
				console.log("error deleting image from cloudinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Controller to get recommended products
export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 }, // Randomly sample 4 products
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					price: 1,
				},
			},
		]);

		res.json(products);
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Controller to get products by category
export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.json({ products });
	} catch (error) {
		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Controller to toggle featured status of a product
export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			await updateFeaturedProductsCache();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Function to update featured products in cache (Redis)
async function updateFeaturedProductsCache() {
	try {
		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log("error in update cache function");
	}
}
