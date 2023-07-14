"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'student'
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Faculty'
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Admin'
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
