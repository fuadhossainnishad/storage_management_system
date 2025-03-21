import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import authRouter from "./user.Auth/auth.routes";
const app = express();

dotenv.config();
app.use(express.json())

app.use("/", authRouter);
app.use(errorHandler);

export default app;
