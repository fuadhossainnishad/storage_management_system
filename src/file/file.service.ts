import File, { FileScemaInterface } from "./file.model";

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

export const isExistService = async (
  userId: string,
  filePath: string,
  isFolder?: boolean
) => {
  const query: { userId: string; filePath: string; isFolder?: boolean } = {
    userId,
    filePath,
  };
  if (typeof isFolder !== "undefined") {
    query.isFolder = isFolder;
  }
  const isExist = await File.findOne(query);
  if (!isExist) return false;
  return isExist;
};

export const folderCreateService = async (
  userId: string,
  parentPath: string,
  filePath: string
) => {
  const isFolder = true;
  const isFolderExist = await isExistService(userId, filePath, isFolder);
  if (isFolderExist) return false;
  const isParentExist = await isExistService(userId, parentPath, isFolder);
  if (!isParentExist) return false;
  return isParentExist;
};

export const specificFindAllService = async (
  userId: string,
  fileType: string,
  isFolder: boolean
): Promise<FileScemaInterface[] | false> => {
  const allfiles = await File.find({ userId, fileType, isFolder });
  if (!allfiles) {
    return false;
  }
  return allfiles;
};

export const openService = async (userId: string, filePath: string, isFolder: boolean): Promise<boolean | null> => {
  const isExist = await isExistService(userId, filePath, isFolder)
  if (!isExist) return null
  const updateOPenedAt = await File.updateOne({ userId, filePath, isFolder }, { $set: { openedAt: new Date() } })
  return updateOPenedAt.matchedCount > 0 && updateOPenedAt.modifiedCount > 0;
}