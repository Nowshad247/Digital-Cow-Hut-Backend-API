import { z } from 'zod'

const UpdateUserValidation = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    role: z.enum(['seller', 'buyer']).optional(),
    passord: z.string().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.string().optional(),
  }),
})

export default UpdateUserValidation
