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
exports.cowController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const cowSearchOption_1 = require("../../../constants/cowSearchOption");
const pagenation_1 = require("../../../constants/pagenation");
const apiErrors_1 = __importDefault(require("../../../errors/apiErrors"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const cow_service_1 = require("./cow.service");
const listAcow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getDataBybody = req.body;
        const result = yield cow_service_1.cowServices.createCow(getDataBybody);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Cow data Deleted Successfully!',
            data: result,
        });
    }
    catch (error) {
        const statusCode = 404;
        const errorMessage = 'Resource not found';
        const newApiError = new apiErrors_1.default(statusCode, errorMessage);
        res.send(newApiError);
    }
}));
const showCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Search
    const searchTermFilter = (0, pick_1.default)(req.query, cowSearchOption_1.cowSearchOption);
    //pagenation
    const pageinationOptios = (0, pick_1.default)(req.query, pagenation_1.pagenationFilds);
    const result = yield cow_service_1.cowServices.getCow(pageinationOptios, searchTermFilter);
    res.send({ pageinationOptios, searchTermFilter, result });
}));
const showSingelCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cow_service_1.cowServices.getSingelCow(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cow data Deleted Successfully!',
        data: result,
    });
}));
const UpdateCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cowData = req.body;
    const result = yield cow_service_1.cowServices.updateCowProfile(id, cowData);
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
const DeleteCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cow_service_1.cowServices.DalateCowService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Done',
        data: result,
    });
}));
exports.cowController = {
    listAcow,
    showCow,
    showSingelCow,
    UpdateCow,
    DeleteCow,
};
