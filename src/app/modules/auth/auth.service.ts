import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelper } from '../../../helpers/jwtHelper'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const data = await User.create(payload)
  const { _id, role } = data
  // Refresh Token
  const refreshToken = jwtHelper.generateToken(
    { _id, role },
    config.JWT_SECRET as Secret,
    config.JWT_REFRESH_EXPIRE as string,
  )

  data.refreshToken = refreshToken

  return data
}

export const AurhService = { createUser }
