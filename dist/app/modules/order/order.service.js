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
exports.orderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const apiErrors_1 = __importDefault(require("../../../errors/apiErrors"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const Order_model_1 = __importDefault(require("./Order.model"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //Cow Find
        const cow = yield cow_model_1.default.findById(payload.cow);
        if (cow) {
            throw new apiErrors_1.default(http_status_1.default.BAD_GATEWAY, 'Now Cow Found');
        }
        //find CowSeller
        const cowSeller = yield cow_model_1.default.findById(payload.cow).populate('seller');
        const sellerID = cowSeller === null || cowSeller === void 0 ? void 0 : cowSeller.seller.id;
        if (sellerID) {
            throw new apiErrors_1.default(http_status_1.default.BAD_GATEWAY, 'Cow Seller data is not finding ');
        }
        // Find the buyer
        const buyer = yield user_model_1.default.findById(payload.buyer);
        const buyerId = buyer === null || buyer === void 0 ? void 0 : buyer._id;
        if (buyerId) {
            throw new apiErrors_1.default(http_status_1.default.BAD_GATEWAY, 'No Buyer ');
        }
        const buyerBudgetPrice = (buyer === null || buyer === void 0 ? void 0 : buyer.budget) || 0;
        const newOrder = yield Order_model_1.default.create({
            cow: sellerID,
            buyer: buyerId,
            buyerBudgetPrice,
        });
        yield session.commitTransaction();
        yield session.endSession();
        return {
            sellerID,
            buyerId,
            newOrder,
        };
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new apiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Somthing went wrong');
    }
});
const GetAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Order_model_1.default.find();
    return result;
});
exports.orderService = {
    createOrder,
    GetAllOrders,
};
