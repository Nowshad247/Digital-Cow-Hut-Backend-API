"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const UserZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({ required_error: 'Required 1' }),
            lastName: zod_1.z.string({ required_error: 'Required 2' }),
        }),
        role: zod_1.z.enum(['seller', 'buyer'], {
            required_error: 'Role is required',
        }),
        password: zod_1.z.string({ required_error: 'Required password' }),
        phoneNumber: zod_1.z.string({ required_error: 'Required Pone' }),
        address: zod_1.z.string({ required_error: 'Required 3' }),
        budget: zod_1.z.number({ required_error: 'Required 4' }),
        income: zod_1.z.number({ required_error: 'Required 5' }),
    }),
});
exports.default = UserZodValidation;
