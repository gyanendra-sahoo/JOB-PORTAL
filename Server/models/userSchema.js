import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [4, "Your name must contain at least 4 characters."],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [5, "Your password must contains at least 5 characters."]
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    niches: {
        firstNiche: String,
        secondNiche: String,
        thirdNiche: String,
        fourthNiche: String,
    },
    resume: {
        public_id: String,
        secure_url: String,
    },
    coverLetter: {
        type: String,
    },
    role: {
        type: String,
        enum: ["candidate", "recruiter"],
        required: true,
    }
}, {
    timestamps: true
});

userSchema.pre("save",  async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Token Generation
userSchema.methods.generateToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

export const User = mongoose.model("User", userSchema);