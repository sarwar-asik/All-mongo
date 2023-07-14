"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// dotenv.config({path:process.cwd()})
// dotenv.config({ path: path.join(process.cwd(), "env") });
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
// console.log(process.env);
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    data_url: process.env.DB_URL,
    default_user_pass: process.env.DEFAULT_STUDENT_PASSWORD,
};
