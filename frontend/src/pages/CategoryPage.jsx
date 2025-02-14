import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
	const { fetchProductsByCategory, products } = useProductStore();
	const { category } = useParams();

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	console.log("products:", products);

	return (
		<div className='min-h-screen bg-green-50'>
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16'>
				{/* Category Title */}
				<motion.h1
					className='text-center text-4xl sm:text-5xl font-bold text-green-700 mb-12'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					🌾 {category.charAt(0).toUpperCase() + category.slice(1)} 🌿
				</motion.h1>

				{/* Products Grid */}
				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{/* No products found message */}
					{products?.length === 0 && (
						<h2 className='text-3xl font-semibold text-gray-500 text-center col-span-full'>
							🚜 No products found
						</h2>
					)}

					{/* Render Product Cards */}
					{products?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default CategoryPage;
