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
exports.userController = void 0;
const user_model_1 = require("./user.model");
const user_services_1 = require("./user.services");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponce_1 = __importDefault(require("../../../shared/sendResponce"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    // console.log(user, 'from controller=================');
    // console.log('hitted', data);
    const result = yield user_services_1.UserService.createUserServices(user);
    if (result) {
        (0, sendResponce_1.default)(res, {
            success: true,
            message: 'successfully create semester',
            statusCode: 200,
            data: result,
        });
        // next()
    }
}));
const getUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.User.find();
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'successfully create semester',
        statusCode: 200,
        data: data,
    });
}));
exports.userController = { createUser, getUser };
