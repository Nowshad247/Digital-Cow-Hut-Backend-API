import { Model } from 'mongoose'

type Name = {
  fastName: string
  lastName: string
}
export type IAdmin = {
  _id: string
  name: Name
  phoneNumber: string
  role: 'admin'
  password: string
  address: string
}
export type adminModel = {
  isAdminExist(phoneNumber: string): Pick<IAdmin, '_id' | 'password' | 'role'>
  isPassMatched(givenPass: string, savedPass: string): boolean
} & Model<IAdmin>
