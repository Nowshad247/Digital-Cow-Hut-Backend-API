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
export type IUserCredential = {
  phoneNumber: string
  password: string
}
export type ILoginAdminResponse = {
  phoneNumber: string
  password: string
}

// export type IAdminMethods = {
//   isAdminExist(id: string): Promise<Partial<IAdmin> | null>
//   isPosswordMatch(givenPassword: string, savePassword: string): Promise<boolean>
// }
export type adminModel = {
  isAdminExist(
    phoneNumber: string,
  ): Promise<Pick<IAdmin, '_id' | 'password' | 'role'>>
  isPassMatched(givenPass: string, savedPass: string): boolean
} & Model<IAdmin>
