import { NextFunction, Request, Response } from "express";
import { tryCatchHandler } from "../middleware/tryCatchHandler";
import {
  folderCreateService,
  isExistService,
  specificFileStorageService,
  specificFindAllService,
} from "./file.service";
import File from "./file.model";
import path from "path";
import fs from "fs-extra";

export const folderCreateController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, fileName, parentPath = `/${userId}` } = req.body;
    const folderPath = path.join(parentPath, fileName);
    const folderExist = await folderCreateService(
      userId,
      parentPath,
      folderPath
    );
    if (folderExist) {
      return res.status(400).json({ message: "Folder already exist" });
    }
    const newFolder = new File({
      fileName,
      filePath: folderPath,
      fileSize: 0,
      isFolder: true,
      parentPath,
      userId,
    });
    await newFolder.save();
    res
      .status(201)
      .json({ message: "Folder created successfully", folder: newFolder });
  }
);

export const fileUploadController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, parentPath } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const fileExt = path.extname(file.originalname);
    const filePath = path.join(parentPath, file.originalname);
    const folderExist = await isExistService(userId, parentPath, true);
    if (!folderExist) {
      fs.removeSync(file.path);
      return res.status(400).json({ message: "Folder not exist" });
    }
    const fileExist = await isExistService(userId, filePath, false);
    if (fileExist) {
      fs.removeSync(file.path);
      return res.status(400).json({ message: "File already exist" });
    }

    const newFile = new File({
      fileName: file.originalname,
      filePath,
      fileSize: file.size,
      isFolder: false,
      fileType: file.mimetype,
      parentPath,
      userId,
    });
    await newFile.save();
    return res
      .status(201)
      .json({ message: "File uploaded successfully", newFile });
  }
);

export const specificFindAllControllers = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, fileType, isFolder } = req.body;
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    const findsAll = await specificFindAllService(userId, fileType, isFolder);
    if (!findsAll) {
      return res.status(404).json({ message: "No file exist" })
    }
    const formattedAll = findsAll.map(find => ({
      fileName: find.fileName,
      filePath: find.filePath,
      fileSize: find.fileSize,
      isFolder: find.isFolder,
      fileType: find.fileType || null,
      openedAt: find.openedAt,
      createdAt: find.createdAt,
      updatedAt: find.updatedAt,
      parentPath: find.parentPath,
      userId: find.userId,
      url: find.isFolder ? null : `http://localhost:3000/public/userAset/${find.filePath}`
    }))
    return res.status(200).json({ message: "File found", files: findsAll });
  }
);

export const openController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, filePath, parentPath, isFolder } = req.body
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

  }
)