import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/userSchema.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

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

const getUser = AsyncHandler(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    data: user,
  });
});

const updateUser = AsyncHandler(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    coverLetter: req.body.coverLetter,
    niches: {
      firstNiche: req.body.firstNiche,
      secondNiche: req.body.secondNiche,
      thirdNiche: req.body.thirdNiche,
      fourthNiche: req.body.fourthNiche,
    },
  };

  const { firstNiche, secondNiche, thirdNiche, fourthNiche } = newData.niches;

  if (
    req.user.role === "candidate" &&
    (!firstNiche || !secondNiche || !thirdNiche || !fourthNiche)
  ) {
    return next(
      new ApiError({
        message: "Provide your preferred job niches.",
        statusCode: 400,
      })
    );
  }

  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    if (!resume) {
      return next(
        new ApiError({
          message: "Resume file is required.",
          statusCode: 400,
        })
      );
    }

    if (req.user.resume && req.user.resume?.public_id) {
      await cloudinary.uploader.destroy(req.user.resume.public_id);
    }
    const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
      folder: "resumes",
      resource_type: "auto",
    });
    newData.resume = {
      public_id: newResume.public_id,
      secure_url: newResume.secure_url,
    };

    fs.unlinkSync(req.file.path);
  }

  const userId = req.user._id;

  const user = await User.findByIdAndUpdate(userId, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User updated successfully.",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      coverLetter: user.coverLetter,
      niches: user.niches,
      resume: user.resume || null,
      role: user.role,
    },
  });
});

export { registerUser, loginUser, logoutUser, getUser, updateUser };
