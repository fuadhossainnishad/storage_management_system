import multer from "multer";
import fs from "fs-extra";
import path from "path";
import { Request } from "express";

export const allowedExt = ["pdf", "docx", "jpg", "png"];

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, callback) {
    try {
      const { userId } = req.body;
      if (!userId) {
        callback(new Error("User id required"), "");
      }
      const fileExt = path.extname(file.originalname).slice(1);
      if (!allowedExt.includes(fileExt)) {
        return callback(new Error("Invalid file type"), "");
      }
      const uploadPath = path.join(__dirname, "../../public/userAsset", userId);
      console.log(uploadPath);
      fs.ensureDirSync(uploadPath);
      callback(null, uploadPath);
    } catch (error) {
      callback(error as Error, "");
    }
  },

  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });
export default upload;
