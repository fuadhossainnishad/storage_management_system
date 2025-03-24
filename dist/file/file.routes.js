"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_controller_1 = require("./file.controller");
const multer_config_1 = __importDefault(require("../config/multer.config"));
const fileRouter = express_1.default.Router();
fileRouter.post("/folderCreate", file_controller_1.folderCreateController);
fileRouter.post("/upload", multer_config_1.default.single("file"), file_controller_1.fileUploadController);
fileRouter.patch('/', file_controller_1.renameController);
fileRouter.delete('/', file_controller_1.deleteController);
fileRouter.post('/copy', file_controller_1.duplicateController);
fileRouter.post('/duplicate', file_controller_1.duplicateController);
fileRouter.get('/dateWise', file_controller_1.dateWiseStorageFindController);
fileRouter.patch('/favourite', file_controller_1.favouriteController);
exports.default = fileRouter;
