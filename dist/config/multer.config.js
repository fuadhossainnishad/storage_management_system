"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedExt = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
exports.allowedExt = ["pdf", "docx", "jpg", "png"];
const storage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        try {
            const { userId } = req.body;
            if (!userId) {
                callback(new Error("User id required"), "");
            }
            const fileExt = path_1.default.extname(file.originalname).slice(1);
            if (!exports.allowedExt.includes(fileExt)) {
                return callback(new Error("Invalid file type"), "");
            }
            const uploadPath = path_1.default.join(__dirname, "../../public/userAsset", userId);
            console.log(uploadPath);
            fs_extra_1.default.ensureDirSync(uploadPath);
            callback(null, uploadPath);
        }
        catch (error) {
            callback(error, "");
        }
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
