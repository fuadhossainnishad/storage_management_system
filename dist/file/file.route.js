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
exports.default = fileRouter;
