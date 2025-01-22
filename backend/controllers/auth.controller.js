import {User} from "../models/user.model.js"
import { generateTokenandSetCookies } from "../utils/generateTokenandSetCookies.js.js"
import bcryptjs from"bcryptjs"
import { sendVerificationEmail ,sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail} from "../mailtrap/email.js";
import crypto from "crypto"


export const signup = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    // Check if all required fields are provided
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Validate the role: it must be either "customer" or "seller"
    if (role && !["customer", "seller"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role provided"
      });
    }

    // Set the role to "customer" by default if not provided
    const userRole = role || "customer";

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate a verification token
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    // Create a new user with the selected role
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role: userRole, // Save the role (either "customer" or "seller")
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours validity
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token and set cookies
    generateTokenandSetCookies(res, user._id);

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    // Respond to the client with success
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined, // Do not return the password in the response
      }
    });

  } catch (error) {
    console.error("Error during signup:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later."
    });
  }
};


export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    console.log("Received code: ", code);  // Debug the code received in the request body
    
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      console.log("No user found with that verification token or token expired");
      return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in verifyEmail: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

  



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password with the hash stored in the database
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token and set it in cookies
    generateTokenandSetCookies(res, user._id);

    // Update lastLogin to current time
    user.lastLogin = new Date(); // Ensure camelCase matches the schema
    await user.save();

    // Return the user data excluding the password
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        ...user._doc,
        password: undefined, // Do not return the password in the response
      },
    });

  } catch (error) {
    // Log the error for debugging
    console.error("Error during login:", error);

    // Send a generic error response to the client
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};





export const logout= async(req,res)=>{
  res.clearCookie("token")
  res.status(200).json({
    successs:true,
    message:"Logged out successsfully"
  })
}


export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};