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
exports.dateWiseStorageFindService = exports.openService = exports.deleteServices = exports.duplicateServices = exports.renameServices = exports.favouriteServices = exports.specificFindAllService = exports.folderCreateService = exports.isExistService = exports.specificFileStorageService = exports.totalFileStorageService = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const file_model_1 = __importDefault(require("./file.model"));
const totalFileStorageService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield file_model_1.default.find({ userId }, "fileSize");
    const fileStorage = files.reduce((total, file) => total + file.fileSize, 0);
    return fileStorage;
});
exports.totalFileStorageService = totalFileStorageService;
const specificFileStorageService = (userId, fileExt) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield file_model_1.default.find({ userId }, fileExt);
    const fileStorage = files.reduce((total, file) => total + file.fileSize, 0) / (1024 * 1024);
    return fileStorage;
});
exports.specificFileStorageService = specificFileStorageService;
const isExistService = (userId, filePath, isFolder) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        userId,
        filePath,
    };
    if (typeof isFolder !== "undefined") {
        query.isFolder = isFolder;
    }
    const isExist = yield file_model_1.default.findOne(query);
    if (!isExist)
        return false;
    return isExist;
});
exports.isExistService = isExistService;
const folderCreateService = (userId, parentPath, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const isFolder = true;
    const isFolderExist = yield (0, exports.isExistService)(userId, filePath, isFolder);
    if (isFolderExist)
        return false;
    const isParentExist = yield (0, exports.isExistService)(userId, parentPath, isFolder);
    if (!isParentExist)
        return false;
    return isParentExist;
});
exports.folderCreateService = folderCreateService;
const specificFindAllService = (userId, fileType, isFolder) => __awaiter(void 0, void 0, void 0, function* () {
    const allfiles = yield file_model_1.default.find({ userId, fileType, isFolder });
    if (!allfiles) {
        return false;
    }
    return allfiles;
});
exports.specificFindAllService = specificFindAllService;
const favouriteServices = (userId, isFolder, isFavourite, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const allfiles = yield (0, exports.isExistService)(userId, filePath, isFolder);
    if (!allfiles) {
        return false;
    }
    const updateFavourite = yield file_model_1.default.updateOne({ userId, filePath, isFolder }, { $set: { isFavourite: isFavourite } });
    return updateFavourite.matchedCount > 0 && updateFavourite.modifiedCount > 0;
});
exports.favouriteServices = favouriteServices;
const renameServices = (userId, isFolder, isFavourite, filePath, newFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const allfiles = yield (0, exports.isExistService)(userId, filePath, isFolder);
    if (!allfiles) {
        return false;
    }
    const rename = yield file_model_1.default.updateOne({ userId, filePath, isFolder }, { $set: { filePath: newFilePath } });
    return rename.matchedCount > 0 && rename.modifiedCount > 0;
});
exports.renameServices = renameServices;
const duplicateServices = (userId, isFolder, filePath, newFilePath, parentPath, newFileName) => __awaiter(void 0, void 0, void 0, function* () {
    const original = yield (0, exports.isExistService)(userId, filePath, isFolder);
    if (!original) {
        return false;
    }
    try {
        if (!isFolder) {
            const copyfile = yield fs_extra_1.default.copy(filePath, newFilePath);
        }
    }
    catch (error) {
        console.error("Error copying file/folder on server:", error);
        return false;
    }
    const duplicated = new file_model_1.default(Object.assign(Object.assign({}, original.toObject()), { _id: undefined, fileName: newFileName, filePath: newFilePath, updatedAt: new Date(), createdAt: new Date(), openedAt: new Date() }));
    const saveDuplicate = yield duplicated.save();
    if (!saveDuplicate) {
        try {
            yield fs_extra_1.default.remove(newFilePath);
        }
        catch (rollbackError) {
            console.error("Error removing copied file/folder:", rollbackError);
        }
        return false;
    }
    return true;
});
exports.duplicateServices = duplicateServices;
const deleteServices = (userId, isFolder, isFavourite, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const allfiles = yield (0, exports.isExistService)(userId, filePath, isFolder);
    if (!allfiles) {
        return false;
    }
    const deleted = yield file_model_1.default.deleteOne({ userId, filePath, isFolder });
    if (deleted.deletedCount === 0)
        return false;
    return deleted.deletedCount > 0;
});
exports.deleteServices = deleteServices;
const openService = (userId, filePath, isFolder) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield (0, exports.isExistService)(userId, filePath, isFolder);
    if (!isExist)
        return null;
    const updateOPenedAt = yield file_model_1.default.updateOne({ userId, filePath, isFolder }, { $set: { openedAt: new Date() } });
    return updateOPenedAt.matchedCount > 0 && updateOPenedAt.modifiedCount > 0;
});
exports.openService = openService;
const dateWiseStorageFindService = (userId, date) => __awaiter(void 0, void 0, void 0, function* () {
    const findAll = yield file_model_1.default.find({ userId, date });
    if (!findAll)
        return null;
    return findAll;
});
exports.dateWiseStorageFindService = dateWiseStorageFindService;
