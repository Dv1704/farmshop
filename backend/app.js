import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import productRoutes from "./routes/products.routes.js";
import couponsRoutes from "./routes/coupons.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

// Load environment variables from .env file
dotenv.config();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware
app.use(cookieParser()); // Parse incoming cookies
app.use(express.json({ limit: "50mb" })); // Increase limit to 50MB
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Test Route
app.get("/", (req, res) => {
    res.send("Hello world");
    console.log("Hello world");
});

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
console.log("Auth routes running");

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
    });
}

// Start the server
const port = process.env.PORT || 5000; // Ensure a default port
app.listen(port, async () => {
    try {
        await connectDB(); // Ensure DB connection is successful
        console.log(`🚀 Server running on port ${port}`);
    } catch (error) {
        console.error("❌ Failed to connect to database:", error);
        process.exit(1); // Exit process if DB connection fails
    }
});
