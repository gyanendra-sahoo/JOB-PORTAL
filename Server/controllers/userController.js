import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/userSchema.js";

const TokenGeneration = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError({
        message: "User not found.",
        statusCode: 404,
      });
    }
    const token = user.generateToken();
    return token;
  } catch (error) {
    throw new ApiError({
      message: "Token generation failed.",
      statusCode: 500,
    });
  }
};

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
  // if (req.file) {
  //   const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
  //   if (!cloudinaryResponse) {
  //     return next(
  //       new ApiError({
  //         message: "Resume upload failed.",
  //         statusCode: 500,
  //       })
  //     );
  //   }
  //   userData.resume = {
  //     public_id: cloudinaryResponse.public_id,
  //     secure_url: cloudinaryResponse.secure_url,
  //   };
  // }

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

const loginUser = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate required fields
  if (!email || !password) {
    return next(
      new ApiError({
        message: "Email and password are required.",
        statusCode: 400,
      })
    );
  }
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new ApiError({
        message: "Invalid email or password.",
        statusCode: 401,
      })
    );
  }
  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(
      new ApiError({
        message: "Invalid email or password.",
        statusCode: 401,
      })
    );
  }
  const token = await TokenGeneration(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  // Set cookie and send response
  res
    .status(200)
    .cookie("token", token, options)
    .json({
      success: true,
      message: "User logged in successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
});

const logoutUser = AsyncHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully.",
  });
});

export { registerUser, loginUser, logoutUser };
