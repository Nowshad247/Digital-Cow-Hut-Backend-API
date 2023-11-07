"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const createadminSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({ required_error: 'First Name is required!' }),
            lastName: zod_1.z.string({ required_error: 'Lasat name is required!' }),
        }),
        phoneNumber: zod_1.z.string({ required_error: 'Phone Number is required!' }),
        role: zod_1.z.enum(['admin']),
        password: zod_1.z.string({ required_error: 'Password is required!' }),
        address: zod_1.z.string({ required_error: 'Address is required!' }),
    }),
});
const loginadminSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({ required_error: 'Phone Number is required!' }),
        password: zod_1.z.string({ required_error: 'Password is required!' }),
    }),
});
const refreshTockenValidation = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: 'Refresh Token is Required!' }),
    }),
});
exports.AdminValidation = {
    createadminSchema,
    loginadminSchema,
    refreshTockenValidation,
};
