import UserModel from "./user.model";

export const signupUserService = async (
  userName: string,
  email: string,
  password: string
) => {
  const userExists = await findUserService({ email });
  if (userExists) throw { statusCode: 400, message: "Email already exists" };
  const newUser = await UserModel.create({ userName, email, password });
  return {
    id: newUser.id,
    email: newUser.email,
    message: "User registerd successfully",
  };
};

export const findUserService = async ({ email }: { email: string }) => {
  const user = await UserModel.findOne({ email });
  if (!user) return false;
  return user;
};

export const updatePasswordService = async ({
  newpassword,
  email,
}: {
  newpassword: string;
  email: string;
}) => {
  const user = await findUserService({ email });
  if (!user) throw { statusCode: 400, message: "Password updation failed" };
  user.password = newpassword;
  const updateUser = await user.save();
  return updateUser;
};
