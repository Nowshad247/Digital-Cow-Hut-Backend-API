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
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const apiErrors_1 = __importDefault(require("../../errors/apiErrors"));
const jwtHelper_1 = require("../../helpers/jwtHelper");
const auth = (...role) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationToken = req.headers;
        const getToken = authorizationToken.authorization; // May be undefined
        if (!getToken) {
            throw new apiErrors_1.default(http_status_1.default.UNAUTHORIZED, 'You are not applicable to this URL');
        }
        // Verification token and type assertion to IUser or IAdmin
        const user = jwtHelper_1.jwtHelper.verifyToken(getToken, config_1.default.JWT_SECRET); // Type assertion here
        if (role.length && !role.includes(user.role)) {
            throw new apiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Unauthorized Access!');
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
