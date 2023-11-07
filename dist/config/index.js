"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    default_student_pass: process.env.DEFAULT_STUDENT_PASS,
    bycript_sold_round: process.env.BCRYPT_SALT_ROUND,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH: process.env.JWT_REFRESH,
    JWT_SECRET_EXPIRE: process.env.JWT_SECRET_EXPIRE,
    JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE,
};
