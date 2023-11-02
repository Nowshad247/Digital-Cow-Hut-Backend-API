"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_controller_1 = require("./user.controller");
const userSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: user_controller_1.userRole,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    budget: Number,
    income: Number,
}, { timestamps: true });
// 3. Create a Model.
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
