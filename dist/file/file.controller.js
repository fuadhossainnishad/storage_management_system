"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openController = exports.specificFindAllControllers = exports.fileUploadController = exports.folderCreateController = void 0;
const tryCatchHandler_1 = require("../middleware/tryCatchHandler");
const file_service_1 = require("./file.service");
const file_model_1 = __importDefault(require("./file.model"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
exports.folderCreateController = (0, tryCatchHandler_1.tryCatchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, fileName, parentPath = `/${userId}` } = req.body;
    const folderPath = path_1.default.join(parentPath, fileName);
    const folderExist = yield (0, file_service_1.folderCreateService)(userId, parentPath, folderPath);
    if (folderExist) {
        return res.status(400).json({ message: "Folder already exist" });
    }
    const newFolder = new file_model_1.default({
        fileName,
        filePath: folderPath,
        fileSize: 0,
        isFolder: true,
        parentPath,
        userId,
    });
    yield newFolder.save();
    res
        .status(201)
        .json({ message: "Folder created successfully", folder: newFolder });
}));
exports.fileUploadController = (0, tryCatchHandler_1.tryCatchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, parentPath } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const fileExt = path_1.default.extname(file.originalname);
    const filePath = path_1.default.join(parentPath, file.originalname);
    const folderExist = yield (0, file_service_1.isExistService)(userId, parentPath, true);
    if (!folderExist) {
        fs_extra_1.default.removeSync(file.path);
        return res.status(400).json({ message: "Folder not exist" });
    }
    const fileExist = yield (0, file_service_1.isExistService)(userId, filePath, false);
    if (fileExist) {
        fs_extra_1.default.removeSync(file.path);
        return res.status(400).json({ message: "File already exist" });
    }
    const newFile = new file_model_1.default({
        fileName: file.originalname,
        filePath,
        fileSize: file.size,
        isFolder: false,
        fileType: file.mimetype,
        parentPath,
        userId,
    });
    yield newFile.save();
    return res
        .status(201)
        .json({ message: "File uploaded successfully", newFile });
}));
exports.specificFindAllControllers = (0, tryCatchHandler_1.tryCatchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, fileType, isFolder } = req.body;
    if (!userId) {
        return res.status(404).json({ message: "User not found" });
    }
    const findsAll = yield (0, file_service_1.specificFindAllService)(userId, fileType, isFolder);
    if (!findsAll) {
        return res.status(404).json({ message: "No file exist" });
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
    }));
    return res.status(200).json({ message: "File found", files: findsAll });
}));
exports.openController = (0, tryCatchHandler_1.tryCatchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, filePath, parentPath, isFolder } = req.body;
    if (!userId) {
        return res.status(404).json({ message: "User not found" });
    }
}));
