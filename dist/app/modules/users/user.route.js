"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateUserRequest_1 = __importDefault(require("../../middlesWare/validateUserRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/create-user', (0, validateUserRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.userController.createUser);
router.get("/", user_controller_1.userController.getUser);
exports.UserRouter = router;
