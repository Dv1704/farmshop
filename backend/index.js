// import express from "express"
// // import { connectDB } from "./DB/connectDB.js"
// // import authRoutes from "./routes/auth.routes.js"
// import dotenv from "dotenv"

// dotenv.config()


// const app=express()
// app.use(express.json)

// app.get("/",(req,res)=>{
//     res.send("hello world")
//     console.log("Hello .....")
// })

// // app.use("/api/auth",authRoutes)

// app.listen(process.env.PORT,()=>{
//     // connectDB()
//     console.log(`server is running at ${process.env.PORT}`)
// })


// Import express

import express from "express"
// Create an express app
const app = express();

// Define the port
const port = 5001;

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(5001, () => {
    console.log(`Server is running at http://0.0.0.0:${port}/`);
});
