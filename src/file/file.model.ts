import mongoose, { Document, Model, Models, Schema } from "mongoose";
import { type } from "os";

export interface FileScemaInterface extends Document {
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: string
  isFolder: boolean;
  isFavourite: boolean;
  parentPath: string;
  userId: string;
  openedAt: Date
  createdAt: Date
  updatedAt: Date
}

const FileSchema: Schema = new Schema(
  {
    fileName: { type: String, required: [true, "Filename  is required"] },
    filePath: { type: String, required: true },
    fileSize: { type: Number, default: 0 },
    fileType: { type: String, default: "" },
    isFolder: { type: Boolean, default: false },
    isFavourite: { type: Boolean, default: false },
    parentPath: { type: String, required: true },
    userId: { type: String, required: true },
    openedAt: { type: Date, default: Date.now() }
  },
  { timestamps: true }
);

const File: Model<FileScemaInterface> = mongoose.model<FileScemaInterface>(
  "File",
  FileSchema
);

export default File;
