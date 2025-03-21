import mongoose, { Document, Model, Models, Schema } from "mongoose";

export interface FileScemaInterface extends Document {
  fileName: string;
  filePath: string;
  fileSize: number;
  isFolder: boolean;
  parentPath: string;
  userId: string;
}

const FileSchema: Schema = new Schema(
  {
    fileName: { tyype: String, required: [true, "Filename  is required"] },
    filePath: { type: String, required: true },
    fileSize: { type: Number, default: 0 },
    fileType: { type: String, require },
    isFolder: { type: Boolean, default: false },
    parentPath: { type: String, default: "/public/userAsset" },
    userId: { type: String, requires: true },
  },
  { timestamps: true }
);

const File: Model<FileScemaInterface> = mongoose.model<FileScemaInterface>(
  "File",
  FileSchema
);

export default File;
