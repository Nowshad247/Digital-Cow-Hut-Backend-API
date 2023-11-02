import { IUser } from '../user/user.interface'
import User from '../user/user.model'

const createUser = async (payload: IUser): Promise<IUser> => {
  const data = await User.create(payload)
  console.log(data)
  return data
}

export const AurhService = { createUser }
