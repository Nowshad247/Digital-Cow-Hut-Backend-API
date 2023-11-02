"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculaePagenation = (options) => {
    const { limit = 10, page = 1 } = options;
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    return {
        limit,
        page,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.default = calculaePagenation;
