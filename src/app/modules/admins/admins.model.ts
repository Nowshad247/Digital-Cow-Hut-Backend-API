import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { adminRole } from './admin.constant'
import { IAdmin, adminModel } from './admins.interface'

const adminSchema = new Schema<IAdmin, adminModel>(
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

adminSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycript_sold_round),
  )
  next()
})

// Method: Check Admin Existence
adminSchema.statics.isAdminExist = async function (
  phoneNumber,
): Promise<Pick<IAdmin, '_id' | 'password' | 'role'> | null> {
  const adminExist = await Admin.findOne(
    { phoneNumber },
    { id: 1, password: 1, role: 1 },
  )
  return adminExist
}

adminSchema.statics.isPassMatched = async function (
  givenPass: string,
  savePassword: string,
): Promise<boolean> {
  const PassMatched = await bcrypt.compare(givenPass, savePassword)
  return PassMatched
}

const Admin = model<IAdmin, adminModel>('Admin', adminSchema)
export default Admin
