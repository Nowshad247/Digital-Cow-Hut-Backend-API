type Name = {
  firstName: string
  lastName: string
}

type Role = 'seller' | 'buyer'

export type IUser = {
  _id: string
  name: Name
  role: Role
  password: string
  phoneNumber: string
  address: string
  budget?: number
  income?: number
  refreshToken?: string
}
export type IpasswordChange = {
  NewPassword?: string
  OldPassword?: string
}
