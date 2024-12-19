import express from "express";
import { logout,login,signup ,verifyEmail,forgotPassword,resetPassword,checkAuth,getProfile} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router=express.Router()

router.post("/signup",signup)
router.get("/signup",(req,res)=>{
    res.send("got signup route")
    
})
router.post("/login",login)
router.post("/logout",logout)
router.post("/verify-email",verifyEmail)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token", resetPassword);
router.get("/check-auth", verifyToken, checkAuth);;
router.get("/profile", protectRoute, getProfile);








export default router
