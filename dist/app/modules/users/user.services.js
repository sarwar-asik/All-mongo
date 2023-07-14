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
exports.UserService = void 0;
/* eslint-disable no-console */
const user_model_1 = require("./user.model");
const index_1 = __importDefault(require("../../../config.ts/index"));
const user_utils_1 = require("./user.utils");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createUserServices = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(user === null || user === void 0 ? void 0 : user.password)) {
        user.password = index_1.default.default_user_pass;
    }
    const id = yield (0, user_utils_1.generateFacultyId)();
    user.id = id;
    console.log(user, 'from services');
    const createdUser = yield user_model_1.User.create(user);
    if (!createdUser) {
        throw new ApiError_1.default(400, 'Failed to create new User');
    }
    return createdUser;
    // return null
});
exports.UserService = { createUserServices };
// export default { createUser}
