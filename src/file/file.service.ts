import fs from 'fs-extra';
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

export const favouriteServices = async (
  userId: string,
  isFolder: boolean,
  isFavourite: boolean,
  filePath: string
): Promise<boolean> => {
  const allfiles = await isExistService(userId, filePath, isFolder);
  if (!allfiles) {
    return false;
  }
  const updateFavourite = await File.updateOne({ userId, filePath, isFolder }, { $set: { isFavourite: isFavourite } })
  return updateFavourite.matchedCount > 0 && updateFavourite.modifiedCount > 0;
};

export const renameServices = async (
  userId: string,
  isFolder: boolean,
  isFavourite: boolean,
  filePath: string,
  newFilePath: string
): Promise<boolean> => {
  const allfiles = await isExistService(userId, filePath, isFolder);
  if (!allfiles) {
    return false;
  }
  const rename = await File.updateOne({ userId, filePath, isFolder }, { $set: { filePath: newFilePath } })
  return rename.matchedCount > 0 && rename.modifiedCount > 0;
};

export const duplicateServices = async (
  userId: string,
  isFolder: boolean,
  filePath: string,
  newFilePath: string,
  newFileName: string
): Promise<boolean> => {
  const original = await isExistService(userId, filePath, isFolder);
  if (!original) {
    return false;
  }
  try {
    if (!isFolder) {
      const copyfile = await fs.copy(filePath, newFilePath)

    }
  } catch (error) {
    console.error("Error copying file/folder on server:", error);
    return false;
  }
  const duplicated = new File({
    ...original.toObject(),
    _id: undefined,
    fileName: newFileName,
    filePath: newFilePath,
    updatedAt: new Date(),
    createdAt: new Date(),
    openedAt: new Date()
  })

  const saveDuplicate = await duplicated.save()
  if (!saveDuplicate) {
    try {
      await fs.remove(newFilePath)
    } catch (rollbackError) {
      console.error("Error removing copied file/folder:", rollbackError);
    }
    return false
  }


  return true
};

export const deleteServices = async (
  userId: string,
  isFolder: boolean,
  isFavourite: boolean,
  filePath: string
): Promise<boolean> => {
  const allfiles = await isExistService(userId, filePath, isFolder);
  if (!allfiles) {
    return false;
  }
  const deleted = await File.deleteOne({ userId, filePath, isFolder })
  if (deleted.deletedCount === 0) return false
  return deleted.deletedCount > 0;
};


export const openService = async (userId: string, filePath: string, isFolder: boolean): Promise<boolean | null> => {
  const isExist = await isExistService(userId, filePath, isFolder)
  if (!isExist) return null
  const updateOPenedAt = await File.updateOne({ userId, filePath, isFolder }, { $set: { openedAt: new Date() } })
  return updateOPenedAt.matchedCount > 0 && updateOPenedAt.modifiedCount > 0;
}

export const dateWiseStorageFindService = async (userId: string, date: Date): Promise<FileScemaInterface[] | null> => {
  const findAll = await File.find({ userId, date })
  if (!findAll) return null
  return findAll
}

