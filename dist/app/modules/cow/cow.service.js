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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowServices = void 0;
const pagenationhelper_1 = __importDefault(require("../../../helpers/pagenationhelper"));
const cow_constant_1 = require("./cow.constant");
const cow_model_1 = __importDefault(require("./cow.model"));
const createCow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = payload;
    const result = yield cow_model_1.default.create(data);
    return result;
});
const getCow = (pageinationOptios, SearchFilter) => __awaiter(void 0, void 0, void 0, function* () {
    //pagenation
    const { page, skip, limit, sortBy, sortOrder } = (0, pagenationhelper_1.default)(pageinationOptios);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    //serach Filter Data
    const { searchTerm, minPrice, maxPrice } = SearchFilter, filterdata = __rest(SearchFilter, ["searchTerm", "minPrice", "maxPrice"]);
    const addCondition = [];
    if (searchTerm) {
        addCondition.push({
            $or: cow_constant_1.cowSearchFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    // Filter Fields
    if (Object.keys(filterdata).length) {
        addCondition.push({
            $and: Object.entries(filterdata).map(([field, value]) => ({
                [field]: [value],
            })),
        });
    }
    if (minPrice) {
        addCondition.push({ price: { $gte: minPrice } });
    }
    if (maxPrice) {
        addCondition.push({ price: { $lte: maxPrice } });
    }
    const whereCondition = addCondition.length ? { $and: addCondition } : {};
    const result = yield cow_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingelCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findById(id);
    return result;
});
const updateCowProfile = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findOneAndUpdate({ _id: _id }, payload, {
        new: true,
    });
    return result;
});
const DalateCowService = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findByIdAndDelete({ _id: _id });
    return result;
});
exports.cowServices = {
    createCow,
    getCow,
    getSingelCow,
    updateCowProfile,
    DalateCowService,
};
