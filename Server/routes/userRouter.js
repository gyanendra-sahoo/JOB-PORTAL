import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").post(verifyToken, logoutUser);

export default userRouter;
