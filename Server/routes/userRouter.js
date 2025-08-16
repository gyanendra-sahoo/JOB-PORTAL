import { Router } from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").post(verifyToken, logoutUser);

userRouter.route("/profile").get(verifyToken, getUser);

userRouter
  .route("/profile/edit")
  .put(upload.single("resume"), verifyToken, updateUser);

userRouter.route("/update/password").put(verifyToken, updatePassword);

export default userRouter;
