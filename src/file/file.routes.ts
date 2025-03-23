import express from "express";
import {
  dateWiseStorageFindController,
  deleteController,
  duplicateController,
  favouriteController,
  fileUploadController,
  folderCreateController,
  renameController,
} from "./file.controller";
import multer from "multer";
import upload from "../config/multer.config";
const fileRouter = express.Router();

fileRouter.post("/folderCreate", folderCreateController);
fileRouter.post("/upload", upload.single("file"), fileUploadController);
fileRouter.patch('/', renameController)
fileRouter.delete('/', deleteController)
fileRouter.post('/duplicate', duplicateController)
fileRouter.get('/dateWise', dateWiseStorageFindController)
fileRouter.post('/favourite', favouriteController)
export default fileRouter;
