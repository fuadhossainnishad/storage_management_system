"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfileService = exports.updatePasswordService = exports.findUserService = exports.signupUserService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const signupUserService = (userName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield (0, exports.findUserService)({ email });
    if (userExists)
        throw { statusCode: 400, message: "Email already exists" };
    const newUser = yield user_model_1.default.create({ userName, email, password });
    return {
        id: newUser.id,
        email: newUser.email,
        message: "User registerd successfully",
    };
});
exports.signupUserService = signupUserService;
const findUserService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email }) {
    const user = yield user_model_1.default.findOne({ email });
    if (!user)
        return false;
    return user;
});
exports.findUserService = findUserService;
const updatePasswordService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ newpassword, email, }) {
    const user = yield (0, exports.findUserService)({ email });
    if (!user)
        throw { statusCode: 400, message: "Password updation failed" };
    user.password = newpassword;
    const updateUser = yield user.save();
    return updateUser;
});
exports.updatePasswordService = updatePasswordService;
const editProfileService = (email, newUserName) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.default.findOne({ email });
    if (!findUser)
        return null;
    const updateUserName = yield user_model_1.default.updateOne({ email }, { $set: { userName: newUserName } });
    return updateUserName.matchedCount > 0 && updateUserName.modifiedCount > 0;
});
exports.editProfileService = editProfileService;
