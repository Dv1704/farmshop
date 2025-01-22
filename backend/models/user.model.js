import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		cartItems: [
			{
				quantity: {
					type: Number,
					default: 1,
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
			},
		],
		role: {
			type: String,
			enum: ["customer", "seller"],
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
	},
	{ timestamps: true }
);

// Mongoose Pre-Save Middleware for Updating Last Login
userSchema.pre("save", function (next) {
	// Only update lastLogin when the document is being modified (e.g., user logs in)
	if (this.isModified("email") || this.isModified("password")) {
		this.lastLogin = Date.now(); // Update lastLogin only when user details change
	}
	next();
});

export const User = mongoose.model("User", userSchema);
