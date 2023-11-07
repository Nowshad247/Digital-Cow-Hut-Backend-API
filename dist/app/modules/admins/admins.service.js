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
exports.adminsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const apiErrors_1 = __importDefault(require("../../../errors/apiErrors"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const admins_model_1 = __importDefault(require("./admins.model"));
const createAdminService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = admins_model_1.default.create(user);
    return result;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    //Check Admin
    const isUserExist = yield admins_model_1.default.isAdminExist(phoneNumber);
    if (!isUserExist) {
        throw new apiErrors_1.default(http_status_1.default.NOT_FOUND, 'User Does Not Exist');
    }
    //Match Password
    const match = yield admins_model_1.default.isPassMatched(password, isUserExist.password);
    if (!match) {
        throw new apiErrors_1.default(http_status_1.default.NOT_FOUND, 'wrong Password ');
    }
    const { _id, role } = isUserExist;
    const accessTocken = jwtHelper_1.jwtHelper.generateToken({ _id, role }, config_1.default.JWT_SECRET, config_1.default.JWT_SECRET_EXPIRE);
    // Refresh Token
    const refreshToken = jwtHelper_1.jwtHelper.generateToken({ _id, role }, config_1.default.JWT_SECRET, config_1.default.JWT_REFRESH_EXPIRE);
    return { _id, role, refreshToken, accessTocken, match };
});
const refreshTocken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    }
    catch (err) {
        throw new apiErrors_1.default(http_status_1.default.BAD_GATEWAY, 'Bad request');
    }
    if (typeof decoded === 'string') {
        throw new apiErrors_1.default(http_status_1.default.BAD_GATEWAY, 'Token verification failed');
    }
    const getAdminInfo = yield admins_model_1.default.findOne({ _id: decoded === null || decoded === void 0 ? void 0 : decoded._id });
    //Gen new token
    if (!getAdminInfo) {
        throw new apiErrors_1.default(http_status_1.default.BAD_GATEWAY, 'There is not User On this Id');
    }
    const { _id, role } = getAdminInfo;
    const accessTocken = jwtHelper_1.jwtHelper.generateToken({ _id, role }, config_1.default.JWT_SECRET, config_1.default.JWT_SECRET_EXPIRE);
    return accessTocken;
});
exports.adminsService = {
    createAdminService,
    login,
    refreshTocken,
};
