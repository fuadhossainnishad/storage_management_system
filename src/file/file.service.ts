import File from "./file.model";

export const totalFileStorageService = async (userId: string) => {
  const files = await File.find({ userId }, "fileSize");
  const fileStorage = files.reduce((total, file) => total + file.fileSize, 0);
  return fileStorage;
};

export const specificFileStorageService = async (
  userId: string,
  fileExt: string
) => {
  const files = await File.find({ userId }, fileExt);
  const fileStorage =
    files.reduce((total, file) => total + file.fileSize, 0) / (1024 * 1024);
  return fileStorage;
};
