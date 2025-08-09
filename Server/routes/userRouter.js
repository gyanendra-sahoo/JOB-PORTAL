import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { registerUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/register").post(upload.single("resume"), registerUser);

export default userRouter;
