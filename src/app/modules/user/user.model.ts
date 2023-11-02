import { Schema, model } from 'mongoose'
import { userRole } from './user.controller'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: userRole,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    budget: Number,
    income: Number,
  },
  { timestamps: true },
)
// 3. Create a Model.
const User = model<IUser>('User', userSchema)

export default User
