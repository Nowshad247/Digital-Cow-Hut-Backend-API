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
exports.userController = exports.userRole = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagenation_1 = require("../../../constants/pagenation");
const pick_1 = __importDefault(require("../../../shared/pick"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const user_services_1 = require("./user.services");
exports.userRole = ['seller', 'buyer'];
const getAlluser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const pageinationOptios = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: String(req.query.sortBy),
    //   sortOrder: String(req.query.sortorder),
    // }
    const pageinationOptios = (0, pick_1.default)(req.query, pagenation_1.pagenationFilds);
    const result = yield user_services_1.userService.getAllusers(pageinationOptios);
    res.send(result);
}));
const getUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_services_1.userService.getUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Done',
        data: result,
    });
}));
const UpdateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const userData = req.body;
    const result = yield user_services_1.userService.updateProfile(id, userData);
    if (result !== null && result !== undefined) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Update Succesfully',
            data: result,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'Data Not Update , Somthing Is Eror',
            data: null,
        });
    }
}));
const DeleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_services_1.userService.DalateUserService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Done',
        data: result,
    });
}));
exports.userController = {
    getAlluser,
    getUserById,
    UpdateUser,
    DeleteUser,
};
