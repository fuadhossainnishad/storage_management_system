import multer from "multer";
import fs from "fs-extra";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, callback) {
    try {
      const uploadPath = path.join(
        __dirname,
        "/public/userAsset",
        req.body.userId
      );
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
