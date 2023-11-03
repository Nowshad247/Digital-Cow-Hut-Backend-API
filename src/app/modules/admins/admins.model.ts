import { Schema, model } from 'mongoose'
import { adminRole } from './admin.constant'
import { IAdmin } from './admins.interface'

const adminSchema = new Schema<IAdmin>(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: adminRole,
      required: true,
      default: 'admin',
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)
const Admin = model<IAdmin>('Admin', adminSchema)
export default Admin
