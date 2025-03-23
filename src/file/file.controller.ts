import { NextFunction, Request, Response } from "express";
import { tryCatchHandler } from "../middleware/tryCatchHandler";
import {
  deleteServices,
  duplicateServices,
  favouriteServices,
  folderCreateService,
  isExistService,
  renameServices,
  specificFileStorageService,
  specificFindAllService,
} from "./file.service";
import File from "./file.model";
import path from "path";
import fs from "fs-extra";
import { dateWiseStorageFindService } from './file.service';

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

export const favouriteController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, filePath, isFolder, isFavourite } = req.body

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    const favourite = await favouriteServices(userId, isFolder, isFavourite, filePath)
    if (!favourite) {
      return res.status(400).json({ message: "Marked file/folder as favourite failed" })
    }
    return res.status(400).json({ message: "Marked file/folder as favourite failed" })
  }
)

export const renameController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, isFolder, isFavourite, filePath, newFileName } = req.body
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    const rename = await renameServices(userId, isFolder, isFavourite, filePath, newFileName)
    if (!rename) {
      res.status(404).json({ message: "Rename failed" });
    }
    res.status(200).json({ message: "Renamed successfully" })
  }
)
export const copyController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, isFolder, filePath, fileName, parentPath } = req.body
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    const newFileName = path.join('Copy', fileName)
    const newFilePath = path.join(parentPath, newFileName)
    const duplicate = await duplicateServices(userId, isFolder, filePath, newFilePath, parentPath)
    if (!duplicate) {
      res.status(404).json({ message: "Rename failed" });
    }
    res.status(200).json({ message: "Renamed successfully" })
  }
)

export const duplicateController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, isFolder, filePath, fileName, parentPath } = req.body
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    const newFileName = path.join('Copy', fileName)
    const newFilePath = path.join(parentPath, newFileName)
    const duplicate = await duplicateServices(userId, isFolder, filePath, newFilePath, parentPath)
    if (!duplicate) {
      res.status(404).json({ message: "Rename failed" });
    }
    res.status(200).json({ message: "Renamed successfully" })
  }
)

export const deleteController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, isFolder, isFavourite, filePath, newFilePath } = req.body
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    const deleteFile = await deleteServices(userId, isFolder, isFavourite, filePath)
    if (!deleteFile) {
      res.status(404).json({ message: `${isFolder ? "Folder" : "File"} not be deleted` });
    }
    res.status(404).json({ message: `${isFolder ? "Folder" : "File"}  deleted successfully` });
  }
)

export const dateWiseStorageFindController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, date } = req.body
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    const dateWiseFile = await dateWiseStorageFindService(userId, date)
    if (!dateWiseFile) {
      res.status(404).json({ message: "datewise file not found" });
    }
    res.status(404).json({ message: "datewise file  found", file: dateWiseFile });
  }
)