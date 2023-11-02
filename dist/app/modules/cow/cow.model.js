"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CowSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: {
        type: String,
        enum: [
            'Dhaka',
            'Chattogram',
            'Barishal',
            'Rajshahi',
            'Sylhet',
            'Comilla',
            'Rangpur',
            'Mymensingh',
        ],
        required: true,
    },
    breed: {
        type: String,
        enum: [
            'Brahman',
            'Nellore',
            'Sahiwal',
            'Gir',
            'Indigenous',
            'Tharparkar',
            'Kankrej',
        ],
        required: true,
    },
    weight: { type: Number, required: true },
    label: { type: String, enum: ['sale', 'sold out'], required: true },
    category: {
        type: String,
        enum: ['Dairy', 'Beef', 'Dual Purpose'],
        required: true,
    },
    seller: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});
const Cow = (0, mongoose_1.model)('Cow', CowSchema);
exports.default = Cow;
