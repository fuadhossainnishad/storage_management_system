import express from "express";
import {
  fileUploadController,
  folderCreateController,
} from "./file.controller";
import multer from "multer";
import upload from "../config/multer.config";
const fileRouter = express.Router();

fileRouter.post("/folderCreate", folderCreateController);
fileRouter.post("/upload", upload.single("file"), fileUploadController);
export default fileRouter;
