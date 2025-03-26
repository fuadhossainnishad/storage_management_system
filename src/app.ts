import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import authRouter from "./user.Auth/auth.routes";
import fileRouter from "./file/file.routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
const app = express();

dotenv.config();
app.use(express.json());
app.use(helmet({
    frameguard: { action: "deny" },
    noSniff: true,
}))

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
}))

app.use("/user", authRouter);
app.use("/storage", fileRouter);
app.use(errorHandler);

export default app;
