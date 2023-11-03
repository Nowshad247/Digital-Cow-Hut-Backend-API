import { z } from 'zod'

const createadminSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: 'First Name is required!' }),
      lastName: z.string({ required_error: 'Lasat name is required!' }),
    }),
    phoneNumber: z.string({ required_error: 'Phone Number is required!' }),
    role: z.enum(['admin']),
    password: z.string({ required_error: 'Password is required!' }),
    address: z.string({ required_error: 'Address is required!' }),
  }),
})

export default createadminSchema
