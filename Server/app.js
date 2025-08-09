import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./database/connection.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRouter.js";

const app = express();

const corsOption = {
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// MiddleWares
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/api/user", userRouter);
app.get("/server", (req, res) => {
  res.send("Server Working");
});

// Error Middleware
app.use(errorMiddleware);

// Database Connection
connection();

export default app;
