import jwt from "jsonwebtoken"
import dotenv from"dotenv"
import { User } from "../models/user.model.js"
dotenv.config()

export const protectRoute = async (req, res, next) => {
	try {
		const Token = req.cookies.token;

		if (!Token) {
			return res.status(401).json({ message: "Unauthorized - No access token provided" });
		}

		try {
			const decoded = jwt.verify(Token, process.env.JWT_SECRET);
			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}

			req.user = user;

			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
};
export const sellerRoute = (req, res, next) => {
	if (req.user && req.user.role === "seller") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - sellers only" });
	}
};