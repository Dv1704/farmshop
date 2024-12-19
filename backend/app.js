import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

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

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse incoming cookies

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

// Start the server on the port from .env or default to 5000
const port = process.env.PORT ;

app.listen(port, () => {
    connectDB(); // Make sure the DB connection is successful
    console.log(`Web app is up at port ${port}`);
});
