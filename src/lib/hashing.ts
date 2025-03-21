import bcrypt from "bcryptjs";

export const encode = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const decode = async (
  enteredPassword: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, hashPassword);
};
