import { z } from 'zod'

const UserZodValidation = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: 'Required 1' }),
      lastName: z.string({ required_error: 'Required 2' }),
    }),
    role: z.enum(['seller', 'buyer'], {
      required_error: 'Role is required',
    }),
    password: z.string({ required_error: 'Required password' }),
    phoneNumber: z.string({ required_error: 'Required Pone' }),
    address: z.string({ required_error: 'Required 3' }),
    budget: z.number({ required_error: 'Required 4' }),
    income: z.number({ required_error: 'Required 5' }),
  }),
})
const changePasswordValidation = z.object({
  body: z.object({
    OldPassword: z.string({ required_error: 'Old Password Required' }),
    NewPassword: z.string({ required_error: 'Old Password Required' }),
  }),
})

export const authZodValidation = {
  UserZodValidation,
  changePasswordValidation,
}
