import { motion } from "framer-motion";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore"; // Import the correct store
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import toast

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotPassword } = useUserStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await forgotPassword(email);
			setIsSubmitted(true);
		} catch (error) {
			// Show error toast if forgotPassword fails
			toast.error("Something went wrong! Please try again.", {
				style: {
					background: "red",
					color: "white",
				},
			});
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-300 to-green-700"
		>
			<div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
				<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
					Forgot Password
				</h2>

				{!isSubmitted ? (
					<form onSubmit={handleSubmit}>
						<p className="text-gray-900 mb-6 text-center">
							Enter your email address and we'll send you a link to reset your password.
						</p>
						<Input
							icon={Mail}
							type="email"
							placeholder="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
							type="submit"
						>
							{isLoading ? (
								<Loader className="size-6 animate-spin mx-auto" />
							) : (
								"Send Reset Link"
							)}
						</motion.button>
					</form>
				) : (
					<div className="text-center">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
							className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
						>
							<Mail className="h-8 w-8 text-white" />
						</motion.div>
						<p className="text-gray-900 mb-6">
							If an account exists for {email}, you will receive a password reset link shortly.
						</p>
					</div>
				)}

				<div className="px-8 py-4 flex justify-center">
					<button
						onClick={() => window.location.href = '/login'}
						className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
					>
						<ArrowLeft className="h-4 w-4 mr-2 inline" /> Back to Login
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default ForgotPasswordPage;
