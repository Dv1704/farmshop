import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from 'path';

import { connectDB } from "./lib/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import productRoutes from "./routes/products.routes.js";
import couponsRoutes from "./routes/coupons.routes.js"
import paymentRoutes from "./routes/payment.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";


// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware

app.use(cookieParser()); // Parse incoming cookies
app.use(express.json({ limit: '50mb' }));  // Increase limit to 50mb
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Test Route
app.get("/", (req, res) => {
    res.send("Hello world");
    console.log("Hello world");
});

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes) 
app.use("/api/coupons",couponsRoutes)
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
console.log("Auth routes running");


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


// Start the server on the port from .env or default to 5000
const port = process.env.PORT ;

app.listen(port, () => {
    connectDB(); // Make sure the DB connection is successful
    console.log(`Web app is up at port ${port}`);
});
