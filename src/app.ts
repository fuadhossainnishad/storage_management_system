import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import authRouter from "./user.Auth/auth.routes";
import fileRouter from "./file/file.route";
const app = express();

dotenv.config();
app.use(express.json());

app.use("/user", authRouter);
app.use("/storage", fileRouter);
app.use(errorHandler);

export default app;
