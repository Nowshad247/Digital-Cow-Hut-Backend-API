"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodCowValidation = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required!' }),
        age: zod_1.z.number({ required_error: 'Age is required!' }),
        price: zod_1.z.number({ required_error: 'Price is required!' }),
        weight: zod_1.z.number({ required_error: 'Weight is required!' }),
        location: zod_1.z.enum([...cow_constant_1.cowLocation], {
            required_error: 'Location is required',
        }),
        breed: zod_1.z.enum([...cow_constant_1.cowBreed], {
            required_error: 'Breed is required',
        }),
        label: zod_1.z.enum([...cow_constant_1.cowLabel], {
            required_error: 'Label is required',
        }),
        category: zod_1.z.enum([...cow_constant_1.cowCategory], {
            required_error: 'Category is required',
        }),
    }),
});
const UpdateZodCowValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        weight: zod_1.z.number().optional(),
        location: zod_1.z
            .enum([...cow_constant_1.cowLocation], {
            required_error: 'Location is required',
        })
            .optional(),
        breed: zod_1.z
            .enum([...cow_constant_1.cowBreed], {
            required_error: 'Breed is required',
        })
            .optional(),
        label: zod_1.z
            .enum([...cow_constant_1.cowLabel], {
            required_error: 'Label is required',
        })
            .optional(),
        category: zod_1.z
            .enum([...cow_constant_1.cowCategory], {
            required_error: 'Category is required',
        })
            .optional(),
    }),
});
exports.zodCowValidation = { createCowZodSchema, UpdateZodCowValidation };
