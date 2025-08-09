import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/userSchema.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = AsyncHandler(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    address,
    password,
    role,
    firstNiche,
    secondNiche,
    thirdNiche,
    fourthNiche,
    coverLetter,
  } = req.body;
  console.log(req.body);
  // Validate required fields
  if (!name || !email || !phone || !password || !address || !role) {
    return next(
      new ApiError({
        message: "All fields are required.",
        statusCode: 400,
      })
    );
  }

  // Candidate-specific validation
  if (
    role === "candidate" &&
    (!firstNiche || !secondNiche || !thirdNiche || !fourthNiche)
  ) {
    return next(
      new ApiError({
        message: "Provide your preferred job niches.",
        statusCode: 400,
      })
    );
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(
      new ApiError({
        message: "User already exists.",
        statusCode: 400,
      })
    );
  }

  // Prepare user data
  const userData = {
    name,
    email,
    password,
    phone,
    role,
    address,
    niches: { firstNiche, secondNiche, thirdNiche, fourthNiche },
    coverLetter,
  };

  // Resume upload (optional)
  if (req.file) {
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    if (!cloudinaryResponse) {
      return next(
        new ApiError({
          message: "Resume upload failed.",
          statusCode: 500,
        })
      );
    }
    userData.resume = {
      public_id: cloudinaryResponse.public_id,
      secure_url: cloudinaryResponse.secure_url,
    };
  }

  // Save user to DB
  const user = await User.create(userData);

  // Response (no token)
  res.status(201).json({
    success: true,
    message: "User registered successfully.",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export { registerUser };
