import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			// Add to cart and return product details
			addToCart(product);
			toast.success(`Added ${product.name} to cart`);
			console.log("Product added:", product);
			return product;
		}
	};

	return (
		<div className='flex w-64 flex-col overflow-hidden rounded-lg border border-gray-300 bg-green-50 shadow-md'>
			{/* Product Image (smaller size) */}
			<div className='relative mx-2 mt-2 flex h-24 overflow-hidden rounded-md'>
				<img className='object-cover w-full' src={product.image} alt={product.name} />
			</div>

			{/* Product Details */}
			<div className='p-3 text-gray-900'>
				<h5 className='text-lg font-semibold'>{product.name}</h5>
				<p className='text-sm text-gray-700 truncate'>{product.description}</p> {/* Show only one line */}
				<p className='mt-2 text-md font-semibold text-gray-800'>Quantity: {product.quantity}</p>
				<p className='mt-1 text-lg font-bold text-emerald-600'>${product.price}</p>
			</div>

			{/* Button */}
			<div className="p-3">
				<button
					className='flex w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={18} className='mr-2' />
					Add to cart
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
