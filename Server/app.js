import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connection } from './database/connection.js';

const app = express();

const corsOption = {
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}

// MiddleWares
app.use(cors(corsOption));
app.use(cookieParser);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Database Connection
connection();

export default app;