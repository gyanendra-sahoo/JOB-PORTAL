import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/userSchema.js";

const verifyToken = AsyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");
    console.log("Token received for verification:", token);
    if (!token) {
      return next(
        new ApiError({
          message: "Authentication token is required.",
          statusCode: 401,
        })
      );
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decode?.id).select(
      "-password -__v -firstNiche -secondNiche -thirdNiche -fourthNiche -coverLetter -resume -createdAt -updatedAt"
    );
    if (!user) {
      return next(
        new ApiError({
          message: "Invalid token or user not found.",
          statusCode: 404,
        })
      );
    }
    req.user = user;
    next();
  } catch (error) {
    return next(
      new ApiError({
        message: "Token verification failed.",
        statusCode: 500,
      })
    );
  }
});

export { verifyToken };
